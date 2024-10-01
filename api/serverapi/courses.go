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
		log.Printf("Couldn't open database \n%v", err)
		http.Error(w, "Couldn't connect to database", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	body, err := io.ReadAll(req.Body)
	if err != nil {
		log.Printf("Unable to read request body \n%v", err)
		http.Error(w, "Unable to read request body", http.StatusBadRequest)
		return
	}

	var userId UserIDReq
	err = json.Unmarshal(body, &userId)
	if err != nil {
		log.Printf("Unable to parse JSON \n%v", err)
		http.Error(w, "Unable to parse JSON", http.StatusBadRequest)
		return
	}

	rows, err := db.Query("SELECT * FROM courses WHERE user_id = ?", userId.UserID)
	if err != nil {
		log.Printf("Could not query db_table: %s\n %v","courses", err)
		http.Error(w, "Could not query db_table: courses", http.StatusInternalServerError)
		return
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
			
			courses = append(courses, Course{
				ID: id, 
				UserID: userId, 
				Name: name, 
				Price: price, 
				Author: author, 
				Link: link, 
				HoursToComplete: hoursToComplete, 
				HoursCompleted: hoursCompleted})
	}
	defer rows.Close()

	w.Header().Set("Content-Type", "application/json")
  err = json.NewEncoder(w).Encode(courses)
	if err != nil {
		log.Printf("Failed to encode JSON \n%v", err)
		http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
		return
	}
}

func GetTotalHours (w http.ResponseWriter, req *http.Request) {

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

	var totalHours int
	err = db.QueryRow("SELECT SUM(hours_completed) FROM courses WHERE user_id = ?", userId).Scan(&totalHours)
	if err != nil {
		log.Printf("couldn't query db_table: courses %v", err)
		http.Error(w, "Couldn't query db_table: courses", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(map[string]int{"totalHours": totalHours})
	if err != nil {
		log.Printf("Failed to encode JSON \n%v", err)
		http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
		return
	}
}


func GetCoursesPreview(w http.ResponseWriter, req *http.Request) {

	userIdStr := req.URL.Query().Get("userId")

	userIdNum, err := strconv.Atoi(userIdStr)
	if err != nil {
		log.Printf("Couldn't convert userId to num \n%v", err)
		http.Error(w, "Couldn't convert userId to num", http.StatusInternalServerError)
		return
	}

	db, err := sql.Open("sqlite3", "../server/db/prod.db")
	if err != nil {
		log.Printf("Couldn't connect to database prod.db \n%v", err)
		http.Error(w, "Couldn't open database", http.StatusInternalServerError)
		return
	}

	// TODO: add "pinned" column to db so user can choose which courses are displayed on their dashboard
	query := `
	SELECT *
	FROM courses
	WHERE
		user_id = ?
	LIMIT 
		3
	`

	rows, err := db.Query(query, userIdNum)
	if err != nil {
		log.Printf("Couldn't query prod.db table: \n%v", err)
		http.Error(w, "Couldn't open database", http.StatusInternalServerError)
		return
	}

	var threeCourses []Course
	for rows.Next() {
		var id		             int
		var userID		         int
		var name		           string
		var price		           string
		var author		         string
		var link		           string
		var hoursToComplete		 int
		var hoursCompleted		 int

		rows.Scan(
			&id,
			&userID,
			&name,		        
			&price,		        
			&author,		      
			&link,		        
 			&hoursToComplete,	
			&hoursCompleted,	
		)

		threeCourses = append(threeCourses, Course{ID: id, UserID: userID, Name: name, Price: price, Author: author, Link: link, HoursToComplete: hoursToComplete, HoursCompleted: hoursCompleted})
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(threeCourses)
	if err != nil {
		log.Printf("Failed to encode JSON %v", err)
		http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
	}
}
