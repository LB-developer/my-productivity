package serverapi

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func GetAboutMeHandler(res http.ResponseWriter, req *http.Request) {

	db, err := sql.Open("sqlite3", "server/db/test_database.db")
	if err != nil {
		log.Fatal(err)
	}

	rows, err := db.Query("SELECT * FROM info")
	if err != nil {
		log.Fatalf("Could not query db_table: %s\n %v","info", err)
	}
	defer rows.Close()

	var aboutMe PersonalInfo
	for rows.Next() {
		if err := rows.Scan(
			&aboutMe.ID, 
			&aboutMe.FirstName, 
			&aboutMe.LastName,
			&aboutMe.Role,
			&aboutMe.Location,
			&aboutMe.GithubLink,
			&aboutMe.LinkedInLink,
			&aboutMe.Email,
			&aboutMe.Picture,
			&aboutMe.FavTechnologies); err != nil {
				fmt.Printf("info %q: %v", aboutMe.FirstName, err)
			}
	}
	res.Header().Set("Content-Type", "application/json")
  json.NewEncoder(res).Encode(aboutMe)
}








