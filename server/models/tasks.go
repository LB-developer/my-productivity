package models

import (
	"database/sql"
)

type TaskPreview struct {
	TaskID          int    `json:"taskId"`
	TaskStudyLength string `json:"taskStudyLength"`
	TaskName        string `json:"taskName"`
	CourseID        int    `json:"courseId"`
	CourseName      string `json:"courseName"`
	CourseAuthor    string `json:"courseAuthor"`
}

type LastThirtyInGraph struct {
	Id    string        `json:"id"`
	Color string        `json:"color"`
	Data  []Coordinates `json:"data"`
}

type Coordinates struct {
	X string  `json:"x"`
	Y float64 `json:"y"`
}

func GetLastMonthHours(db *sql.DB, userId int) ([]LastThirtyInGraph, error) {
	// get sum of hours for completed tasks within in the last 30 days
	// uncompleted tasks contribute 0 to total time
	// returned format is: MM/DD | Hours
	query := `
	SELECT 
	strftime('%m/%d', study_date) AS month,
	SUM(
		CASE 
			WHEN is_completed = 1 THEN (strftime('%s', study_length) - strftime('%s', '00:00:00')) / 3600
			ELSE 0
		END
		) AS total_time
	FROM tasks 
	WHERE user_id = ? 
	AND julianday('now') - julianday(study_date) BETWEEN -1 AND 29 -- -1 to account for handling US based date
	GROUP BY
	month;`

	rows, err := db.Query(query, userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var lastThirtyGraph []LastThirtyInGraph
	var lastThirty LastThirtyInGraph
	lastThirty.Id = "history" // id property for nivo graph struct
	lastThirty.Color = "blue" // color property ^
	for rows.Next() {
		var month string
		var totalTime float64
		if err := rows.Scan(&month, &totalTime); err != nil {
			return nil, err
		}
		coord := Coordinates{
			X: month,
			Y: totalTime,
		}
		lastThirty.Data = append(lastThirty.Data, coord)
	}
	lastThirtyGraph = append(lastThirtyGraph, lastThirty)

	return lastThirtyGraph, nil
}

func GetSchedulePreview(db *sql.DB, userId int) ([]TaskPreview, error) {
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

	rows, err := db.Query(query, userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var todaysTasks []TaskPreview
	for rows.Next() {
		var task TaskPreview
		if err := rows.Scan(&task.TaskID, &task.TaskStudyLength, &task.TaskName, &task.CourseID, &task.CourseName, &task.CourseAuthor); err != nil {
			return nil, err
		}
		todaysTasks = append(todaysTasks, task)
	}

	return todaysTasks, nil
}