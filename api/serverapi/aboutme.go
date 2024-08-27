package serverapi

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
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
			&aboutMe.Name, 
			&aboutMe.LastName,
			&aboutMe.Role,
			&aboutMe.Location,
			&aboutMe.Github,
			&aboutMe.Linkedin,
			&aboutMe.Email,
			&aboutMe.Picture,
			&aboutMe.FavTechnologies); err != nil {
				fmt.Printf("info %q: %v", aboutMe.Name, err)
			}
	}
	res.Header().Set("Content-Type", "application/json")
  json.NewEncoder(res).Encode(aboutMe)
}

func UpdateAboutMeHandler(res http.ResponseWriter, req *http.Request) {
	body, err := io.ReadAll(req.Body)
	if err != nil {
		http.Error(res, "Unable to read request body", http.StatusBadRequest)
		return
	}
	if len(body) == 0 {
		http.Error(res, "Request body is empty", http.StatusBadRequest)
		return
	}

	db, err := sql.Open("sqlite3", "server/db/test_database.db")
	if err != nil {
		log.Fatal(err)
	}

	var updatedData PersonalInfoWithoutId
	err = json.Unmarshal(body, &updatedData)
	if err != nil {
		http.Error(res, "Unable to parse JSON", http.StatusBadRequest)
		return
	}

	_, err = db.Exec("UPDATE info SET first_name = ?,role = ?,location = ?,github_acc_link = ?,linkedin_link = ?,email_link = ?,picture_url = ?",
	&updatedData.Name, 
	&updatedData.Role,
	&updatedData.Location,
	&updatedData.Github,
	&updatedData.Linkedin,
	&updatedData.Email,
	&updatedData.Picture,
	)
	if err != nil {
		log.Fatal(err)
	}
	
	
}






