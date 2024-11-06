package models

import (
	"database/sql"
	"log"
)

type UserModel struct {
	DB *sql.DB
}

type UserIDReq struct {
	UserID string `json:"userId"`
}

type UserStats struct {
	CoursesCount  int `json:"coursesCount"`
	ProjectsCount int `json:"projectsCount"`
	HoursCount    int `json:"totalHoursCompleted"`
}

func (u UserModel) GetUserStats(userPublicID string) (UserStats, error) {
	userId, err := GetUserIdFromPublicId(u.DB, userPublicID)
	if err != nil {
		log.Printf("Users public id is not in the database")
		return UserStats{}, err
	}

	query := `
	SELECT
   		(SELECT COUNT(*) FROM courses WHERE user_id = ?), -- total courses of the user
   		(SELECT COUNT(*) FROM projects WHERE user_id = ?), -- total projects of the user
   		(SELECT SUM(strftime('%s', tasks.study_length) - strftime('%s', '00:00:00')) / 3600 ) -- sum of completed task hours
   	FROM tasks
   	WHERE user_id = ?
   	AND is_completed = 1;
	`

	rows, err := u.DB.Query(query, userId, userId, userId) // TODO: de-duplicate
	if err != nil {
		return UserStats{}, err
	}
	defer rows.Close()

	var userStats UserStats
	for rows.Next() {
		rows.Scan(
			&userStats.CoursesCount,
			&userStats.ProjectsCount,
			&userStats.HoursCount,
		)
	}
	return userStats, nil
}
