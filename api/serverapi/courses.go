package serverapi

import (
	"database/sql"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"strconv"
)

func GetCoursesById(w http.ResponseWriter, req *http.Request) {

	db, err := sql.Open("sqlite3", "../server/db/prod.db")
	if err != nil {
		log.Print(err)
		return
	}
	defer db.Close()

	body, err := io.ReadAll(req.Body)
	if err != nil {
		http.Error(w, "Unable to read request body", http.StatusBadRequest)
	}

	var userId UserIDReq
	err = json.Unmarshal(body, &userId)
	if err != nil {
		http.Error(w, "Unable to parse JSON", http.StatusBadRequest)
		return
	}

	rows, err := db.Query("SELECT * FROM courses WHERE user_id = ?", userId.UserID)
	if err != nil {
		log.Printf("Could not query db_table: %s\n %v","courses", err)
	}
	defer rows.Close()
	
	var courses []Course
	for rows.Next() {
		var id 								int
		var userId 						int
		var name            	string
		var price           	string
		var author          	string
		var link            	string
		var hoursToComplete		int   
		var hoursCompleted  	int   

		err := rows.Scan(
			&id, 
			&userId,
			&name, 
			&price,
			&author,
			&link,
			&hoursToComplete,
			&hoursCompleted,
			) 
			if err != nil {
				log.Fatal(err)
			}

			log.Println(id, userId)
			courses = append(courses, Course{ID: id, UserID: userId, Name: name, Price: price, Author: author, Link: link, HoursToComplete: hoursToComplete, HoursCompleted: hoursCompleted})
	}
	w.Header().Set("Content-Type", "application/json")
  err = json.NewEncoder(w).Encode(courses)
	if err != nil {
		http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
	}
}

func GetTotalHours (w http.ResponseWriter, req *http.Request) {

	userIdStr := req.URL.Query().Get("userId")
	if userIdStr == "" {
		http.Error(w, "Missing userId query", http.StatusBadRequest)
		return
	}
	
	userId, err := strconv.Atoi(userIdStr)
	if err != nil {
		http.Error(w, "Invalid userId query", http.StatusBadRequest)
		return
	}

	db, err := sql.Open("sqlite3", "../server/db/prod.db")
	if err != nil {
		log.Fatal(err)
	}

	var totalHours int
	err = db.QueryRow("SELECT SUM(hours_completed) FROM courses WHERE user_id = ?", userId).Scan(&totalHours)
	if err != nil {
		log.Printf("couldn't query db_table: courses %v", err)
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(map[string]int{"totalHours": totalHours})
	if err != nil {
		http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
	}

}



