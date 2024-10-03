package serverapi

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
)

func UserWidgetInfo (w http.ResponseWriter, req *http.Request) {

	userIdStr := req.URL.Query().Get("userId")
	if userIdStr == "" {
		log.Printf("Missing user Id query")
		http.Error(w, "Missing userId query", http.StatusBadRequest)
		return
	}
	
	userId, err := strconv.Atoi(userIdStr)
	if err != nil {
		log.Printf("Invalid userId query \n%v", err)
		http.Error(w, "Invalid userId query", http.StatusBadRequest)
		return
	}

	db, err := sql.Open("sqlite3", "../server/db/prod.db")
	if err != nil {
		log.Printf("Couldn't open database \n%v", err)
		http.Error(w, "Couldn't connect to database", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	query := `
	SELECT
   (SELECT COUNT(*) FROM courses WHERE user_id = ?), -- total courses of the user
   (SELECT COUNT(*) FROM projects WHERE user_id = ?), -- total projects of the user
   (SELECT SUM(strftime('%s', tasks.study_length) - strftime('%s', '00:00:00')) / 3600 ) -- sum of completed task hours
   FROM tasks
   WHERE user_id = ?
   AND is_completed = 1;
	`


rows, err := db.Query(query, userId, userId, userId) // TODO: de-duplicate 
	if err != nil {
		log.Printf("Couldn't query database for total hours, courses, projects %v", err)
		http.Error(w, "Couldn't query database for total hours, courses, projects", http.StatusInternalServerError)
		return
	}
	
	var userStats UserStats
	for rows.Next() {
			rows.Scan(
				&userStats.CoursesCount,
				&userStats.ProjectsCount,
				&userStats.HoursCount,
			)
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(userStats)
	if err != nil {
		log.Printf("Failed to encode JSON \n%v", err)
		http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
		return
	}
}
