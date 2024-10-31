package models

import (
	"database/sql"
	"log"
)

type Course struct {
	ID                 int    `json:"id"`
	UserID             string `json:"userId"`
	Name               string `json:"name"`
	Price              string `json:"price"`
	Author             string `json:"author"`
	Link               string `json:"link"`
	EstHoursToComplete int    `json:"estHoursToComplete"`
	IsCompleted        bool   `json:"isCompleted"`
	InProgress         bool   `json:"inProgress"`
}

func GetCoursesByUserId(db *sql.DB, userPublicID string) ([]Course, error) {
	userId, err := GetUserIdFromPublicId(db, userPublicID)
	if err != nil {
		log.Printf("Users public id is not in the database")
		return nil, err
	}
	query := `
	SELECT *
	FROM courses
	WHERE user_id = ?
	`

	rows, err := db.Query(query, userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var courses []Course
	for rows.Next() {

		var course Course
		err := rows.Scan(
			&course.ID,
			&course.UserID,
			&course.Name,
			&course.Price,
			&course.Author,
			&course.Link,
			&course.EstHoursToComplete,
			&course.IsCompleted,
			&course.InProgress,
		)
		if err != nil {
			log.Printf("Couldn't scan courses %v", err)
			return nil, err
		}

		courses = append(courses, course)
	}

	return courses, nil
}

func GetCoursesPreview(db *sql.DB, userPublicID string) ([]Course, error) {
	userId, err := GetUserIdFromPublicId(db, userPublicID)
	if err != nil {
		log.Printf("Users public id is not in the database")
		return nil, err
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

	rows, err := db.Query(query, userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var threeCourses []Course
	for rows.Next() {

		var course Course
		err := rows.Scan(
			&course.ID,
			&course.UserID,
			&course.Name,
			&course.Price,
			&course.Author,
			&course.Link,
			&course.EstHoursToComplete,
			&course.IsCompleted,
			&course.InProgress,
		)
		if err != nil {
			log.Printf("Couldn't scan courses %v", err)
			return nil, err
		}

		threeCourses = append(threeCourses, course)
	}

	return threeCourses, nil
}
