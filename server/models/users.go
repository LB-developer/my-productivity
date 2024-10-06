package models

import "database/sql"

type UserIDReq struct {
	UserID int `json:"userId"`
}

type UserStats struct {
	CoursesCount  int `json:"coursesCount"`
	ProjectsCount int `json:"projectsCount"`
	HoursCount    int `json:"totalHoursCompleted"`
}

func GetUserStats(userId int) (UserStats, error) {
	db, err := sql.Open("sqlite3", "../server/db/prod.db")
	if err != nil {
		return UserStats{}, err
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
