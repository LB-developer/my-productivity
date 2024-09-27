package serverapi

import (
	"database/sql"
	"encoding/json"
	"log"
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
	SELECT SUM(strftime('%s', study_length) - strftime('%s', '00:00:00')) / 60 
	FROM tasks 
	WHERE user_id = ? 
	AND is_completed = 1 
	AND julianday('now') - julianday(study_date) < 31;`
	
	var lastMonthHours LastThirtyHoursInMinutes
	err = db.QueryRow(query, userIdNum).Scan(&lastMonthHours.Hours)
	if err != nil {
		log.Printf("couldn't query last month hours of db_table: tasks %v", err)
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(lastMonthHours)
	if err != nil {
		http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
	}
}