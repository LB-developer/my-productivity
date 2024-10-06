package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"productivity/server/models"
	"strconv"
)

func UserWidgetInfoHandler(w http.ResponseWriter, req *http.Request) {
	userIdStr := req.URL.Query().Get("userId")
	if userIdStr == "" {
		log.Printf("Missing user Id query")
		http.Error(w, "Missing userId query", http.StatusBadRequest)
		return
	}
	
	userId, err := strconv.Atoi(userIdStr)
	if err != nil {
		log.Printf("Invalid userId query \n%v", err)
		http.Error(w, "Invalid userId query", http.StatusBadRequest)
		return
	}

	userStats, err := models.GetUserStats(userId)
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
