package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"productivity/server/models"

	_ "github.com/mattn/go-sqlite3"
)

func (h *Handler) GetProjectsHandler(w http.ResponseWriter, req *http.Request) {
	projects, err := models.GetProjects(h.DB)
	if err != nil {
		log.Printf("Couldn't fetch: projects \n%v", err)
		http.Error(w, "Couldn't fetch: projects", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(projects)
}
