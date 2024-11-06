package main

import (
	"encoding/json"
	"log"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
)

func (app *application) GetProjectsHandler(w http.ResponseWriter, req *http.Request) {
	projects, err := app.models.Projects.GetProjects()
	if err != nil {
		log.Printf("Couldn't fetch: projects \n%v", err)
		http.Error(w, "Couldn't fetch: projects", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(projects)
}
