package models

import "database/sql"

func GetUserIdFromPublicId(db *sql.DB, userPublicID string) (int, error) {
	// get user id from the public id
	userIDQuery := `
	SELECT id
	FROM users
	WHERE public_id = ?
	`
	var userId int
	userIdRow := db.QueryRow(userIDQuery, userPublicID)
	err := userIdRow.Scan(&userId)
	if err != nil {
		return -1, err
	}

	return userId, nil
}
