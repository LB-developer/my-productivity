package serverapi

import (
	"database/sql"
	"encoding/json"
	"log"
	"math"
	"net/http"
	"strconv"
)

func GetLastMonthHours(w http.ResponseWriter, req *http.Request) {
	
	db, err := sql.Open("sqlite3", "../server/db/prod.db")
	if err != nil {
		log.Printf("Couldn't open prod.db %v", err)
		http.Error(w, "Couldn't connect to prod.db", http.StatusInternalServerError)
		return 
	}
	defer db.Close()
	
	userIdStr := req.URL.Query().Get("userId")	
	if userIdStr == "" {
		http.Error(w, "Missing userId query", http.StatusBadRequest)
		return
	}
	
	// convert userId string to int
	userIdNum, err := strconv.Atoi(userIdStr)
	if err != nil {
		http.Error(w, "Invalid userId query", http.StatusBadRequest)
		return
	}
	
	// get sum of hours for completed tasks within in the last 30 days
	// uncompleted tasks contribute 0 to total time
	// returned format is: MM/DD | Hours
	query := `
	SELECT 
	strftime('%m/%d', study_date) AS month,
	SUM(
		CASE 
			WHEN is_completed = 1 THEN (strftime('%s', study_length) - strftime('%s', '00:00:00')) / 60
			ELSE 0
		END
		) AS total_time
	FROM tasks 
	WHERE user_id = ? 
	AND julianday('now') - julianday(study_date) BETWEEN -1 AND 29 -- -1 to account for handling US based date
	GROUP BY
	month;`
	
	rows, err := db.Query(query, userIdNum)
	if err != nil {
		log.Printf("couldn't query last month hours of db_table: tasks %v", err)
		http.Error(w, "Couldn't query last month hours of db_table: tasks", http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	
	var lastThirtyGraph []LastThirtyInGraph
	var lastThirty LastThirtyInGraph	
	lastThirty.Id = "history" // id property for nivo graph struct
	lastThirty.Color = "blue" // color property ^
	
	for rows.Next() {
		var md 		string // month day
		var minutes float64

		err := rows.Scan(
			&md,
			&minutes)
		if err != nil {
			log.Printf("couldn't scan %v", err)
		}	
		
		lastThirty.Data = append(lastThirty.Data, Coordinates{X: md, Y: math.Round(minutes / 60)})
	}
	lastThirtyGraph = append(lastThirtyGraph, lastThirty)


	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(lastThirtyGraph)
	if err != nil {
		log.Printf("Failed to encode lastThirtyGraph to JSON \n%v", err)
		http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
		return
	}
}