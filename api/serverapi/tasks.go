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
		log.Printf("couldn't open prod.db, %v", err)
	}

	
	userIdStr := req.URL.Query().Get("userId")	
	if userIdStr == "" {
		http.Error(w, "Missing userId query", http.StatusBadRequest)
		return
	}
	
	userIdNum, err := strconv.Atoi(userIdStr)
	if err != nil {
		http.Error(w, "Invalid userId query", http.StatusBadRequest)
		return
	}
	
	// get sum of minutes for completed tasks within in the last 30 days
	query := `
	SELECT 
	strftime('%m/%d', study_date) AS month,
	SUM(strftime('%s', study_length) - strftime('%s', '00:00:00')) / 60 AS total_minutes
	FROM tasks 
	WHERE user_id = ? 
	AND julianday('now') - julianday(study_date) BETWEEN 0 AND 30
	GROUP BY
	month;`
	
	rows, err := db.Query(query, userIdNum)
	if err != nil {
		log.Printf("couldn't query last month hours of db_table: tasks %v", err)
	}
	defer rows.Close()
	
	var lastThirtyGraph []LastThirtyInGraph
	var lastThirty LastThirtyInGraph	
	lastThirty.Id = `history`
	lastThirty.Color = "hsl(251, 100%, 55%)"
	
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
		http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
	}
}