package serverapi

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
)

func GetSchedulePreview(w http.ResponseWriter, res *http.Request) {

	userIdStr:= res.URL.Query().Get("userId")

	userIdNum, err := strconv.Atoi(userIdStr)
	if err != nil {
		log.Printf("couldn't convert userIdStr to int %v", err)
	}

	db, err := sql.Open("sqlite3", "../server/db/prod.db")
	if err != nil {
		log.Printf("couldn't open prod.db %v", err)
		http.Error(w, "couldn't connect to prod.db", http.StatusInternalServerError)
		return 
	}
	defer db.Close()

	query := `
	SELECT 
	tasks.id AS "Task ID",
	tasks.study_length AS "Study Length",
	courses.id AS "Course ID", 
	courses.name AS "Course Name", 
	courses.author AS "Course Author"  
	FROM 
		tasks 
		CROSS JOIN courses ON tasks.course_id = courses.id 
	WHERE 
		tasks.user_id = ? 
		AND 
    -- -1 AND 0 because of US time conversion i.e. US is one day ahead (I think?)
		julianday('now') - julianday(tasks.study_date) BETWEEN -1 AND 0;
	`
	var todaysTasks []TaskPreview
	rows, err := db.Query(query, userIdNum)
	if err != nil {
		log.Printf("couldn't query db %v", err)
		http.Error(w, "couldn't query prod.db", http.StatusInternalServerError)
		return
	}
	defer rows.Close()
	
	for rows.Next() {
		var taskId int
		var taskStudyLength string
		var courseId int
		var courseName string
		var courseAuthor string
		
		rows.Scan(
			&taskId,
			&taskStudyLength,
			&courseId,
			&courseName,
			&courseAuthor,
		)

		todaysTasks = append(todaysTasks, TaskPreview{TaskID: taskId, TaskStudyLength: taskStudyLength, CourseID: courseId, CourseName: courseName, CourseAuthor: courseAuthor})
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(todaysTasks)
	if err != nil {
		log.Printf("Failed to encode JSON %v", err)
		http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
	}
}