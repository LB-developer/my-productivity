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
		log.Printf("Couldn't convert userIdStr to int %v", err)
		http.Error(w, "Couldn't conver userIdStr to int", http.StatusInternalServerError)
		return
	}

	db, err := sql.Open("sqlite3", "../server/db/prod.db")
	if err != nil {
		log.Printf("Couldn't open prod.db %v", err)
		http.Error(w, "Couldn't connect to prod.db", http.StatusInternalServerError)
		return 
	}
	defer db.Close()

	query := `
	SELECT 
	tasks.id AS "TaskID",
	tasks.study_length AS "StudyLength",
	tasks.task_name AS "TaskName",
	courses.id AS "CourseID", 
	courses.name AS "CourseName", 
	courses.author AS "CourseAuthor"  
	FROM 
		tasks 
		CROSS JOIN courses ON tasks.course_id = courses.id 
	WHERE 
		tasks.user_id = ? 
		AND 
    -- -1 AND 0 because of US time conversion i.e. US is one day ahead (I think?)
		julianday('now') - julianday(tasks.study_date) BETWEEN -1 AND 0
	LIMIT 
		3;
	`
	var todaysTasks []TaskPreview
	rows, err := db.Query(query, userIdNum)
	if err != nil {
		log.Printf("Couldn't query db %v", err)
		http.Error(w, "Couldn't query prod.db", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var taskId 					int
		var taskStudyLength string
		var taskName 				string
		var courseId 				int
		var courseName			string
		var courseAuthor	  string
		
		rows.Scan(
			&taskId,
			&taskStudyLength,
			&taskName,
			&courseId,
			&courseName,
			&courseAuthor,
		)

		todaysTasks = append(todaysTasks, TaskPreview{TaskID: taskId, TaskStudyLength: taskStudyLength, TaskName: taskName, CourseID: courseId, CourseName: courseName, CourseAuthor: courseAuthor})
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(todaysTasks)
	if err != nil {
		log.Printf("Failed to encode JSON %v", err)
		http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
	}
}