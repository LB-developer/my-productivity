package serverapi

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
)


func GetProjectsHandler(w http.ResponseWriter, req *http.Request) {
	var projects []Project
	
	db, err := sql.Open("sqlite3", "server/db/test_database.db")
	if err != nil {
		log.Printf("Couldn't open prod.db %v", err)
		http.Error(w, "Couldn't connect to prod.db", http.StatusInternalServerError)
		return 
	}
	defer db.Close()

	rows, err := db.Query("SELECT * FROM projects")
	if err != nil {
		log.Printf("Couldn't query db_table: projects \n%v", err)
		http.Error(w, "Couldn't query db_table: projects", http.StatusInternalServerError)
		return
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

	w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(projects)
}