package models

import (
	"database/sql"
	"log"
)

type Course struct {
	ID              int    `json:"id"`
	UserID          int    `json:"userId"`
	Name            string `json:"name"`
	Price           string `json:"price"`
	Author          string `json:"author"`
	Link            string `json:"link"`
	HoursToComplete int    `json:"hoursToComplete"`
	HoursCompleted  int    `json:"hoursCompleted"`
}

func FetchCoursesById (db *sql.DB, userId UserIDReq) ([]Course, error) {
	
	query := `
	SELECT *
	FROM courses
	WHERE user_id = ?
	`
	
	rows, err := db.Query(query, userId.UserID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	
	var courses []Course
	for rows.Next() {
		var id 					int
		var userId 				int
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
				log.Printf("Couldn't scan courses %v", err)
				return nil, err
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

	return courses, nil
}

func FetchCoursesPreview(db *sql.DB, userId int) ([]Course, error) {
	// TODO: add "pinned" column to db so user can choose which courses are displayed on their dashboard
	query := `
	SELECT *
	FROM courses
	WHERE
		user_id = ?
	LIMIT 
		3
	`

	rows, err := db.Query(query, userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()


	var threeCourses []Course
	for rows.Next() {
		var id int
		var userID int
		var name string
		var price string
		var author string
		var link string
		var hoursToComplete int
		var hoursCompleted int

		err := rows.Scan(
			&id,
			&userID,
			&name,
			&price,
			&author,
			&link,
			&hoursToComplete,
			&hoursCompleted,
		)
		if err != nil {
			log.Printf("Couldn't scan courses %v", err)
			return nil, err
		}

		threeCourses = append(threeCourses, Course{ID: id, UserID: userID, Name: name, Price: price, Author: author, Link: link, HoursToComplete: hoursToComplete, HoursCompleted: hoursCompleted})
	}

	return threeCourses, nil
}