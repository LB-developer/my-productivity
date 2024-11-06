package main

import (
	"encoding/json"
	"net/http"

	"productivity/server/internal/models"
)

func (app *application) GetTechnologiesHandler(w http.ResponseWriter, req *http.Request) {
	icons, err := models.FetchTechnologies()
	if err != nil {
		http.Error(w, "Failed to fetch technologies", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(icons)
	if err != nil {
		http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
	}
}
