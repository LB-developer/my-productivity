package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func (app *application) UserWidgetInfoHandler(w http.ResponseWriter, req *http.Request) {
	userPublicID := req.URL.Query().Get("userId")
	if userPublicID == "" {
		log.Printf("Missing user Id query")
		http.Error(w, "Missing userId query", http.StatusBadRequest)
		return
	}

	userStats, err := app.models.Users.GetUserStats(userPublicID)
	if err != nil {
		log.Printf("Couldn't get user stats %v", err)
		http.Error(w, "Couldn't get user stats", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(userStats)
	if err != nil {
		log.Printf("Couldn't encode JSON %v", err)
		http.Error(w, "Couldn't encode JSON", http.StatusInternalServerError)
		return
	}
}
