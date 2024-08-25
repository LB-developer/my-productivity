package serverapi

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
)


func GetProjectsHandler(res http.ResponseWriter, req *http.Request) {
	log.Println("Handling /api/v1/projects")
	
	var projects []Project
	
	db, err := sql.Open("sqlite3", "server/db/test_database.db")
	if err != nil {
		log.Fatal(err)
	}

	rows, err := db.Query("SELECT * FROM projects")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		var project Project
		if err := rows.Scan(
			&project.ID, 
			&project.Name, 
			&project.Description, 
			&project.Technologies, 
			&project.GithubLink, 
			&project.DemoLink, 
			&project.ImageURL, 
			&project.Status); err != nil {
			fmt.Printf("projects %q: %v", project.Name, err)
		}
		projects = append(projects, project)
	}

	res.Header().Set("Content-Type", "application/json")
  json.NewEncoder(res).Encode(projects)
}