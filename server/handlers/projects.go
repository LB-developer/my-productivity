package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	server "productivity/server/db"
	"productivity/server/models"

	_ "github.com/mattn/go-sqlite3"
)


func GetProjectsHandler(w http.ResponseWriter, req *http.Request) {
	
	db, err := server.InitDB(w)	
	if err != nil {
		log.Printf("Couldn't connect to database prod.db \n%v", err)
		http.Error(w, "Couldn't open database", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	projects, err := models.GetProjects(db)
	if err != nil {
		log.Printf("Couldn't fetch: projects \n%v", err)
		http.Error(w, "Couldn't fetch: projects", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(projects)
}