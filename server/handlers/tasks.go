package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	server "productivity/server/db"
	"productivity/server/models"
)

func GetLastMonthHoursHandler(w http.ResponseWriter, req *http.Request) {
	db, err := server.InitDB(w)
	if err != nil {
		log.Printf("Couldn't open prod.db %v", err)
		http.Error(w, "Couldn't connect to prod.db", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	userIdStr := req.URL.Query().Get("userId")
	if userIdStr == "" {
		http.Error(w, "Missing userId query", http.StatusBadRequest)
		return
	}

	userIdNum, err := strconv.Atoi(userIdStr)
	if err != nil {
		http.Error(w, "Invalid userId query", http.StatusBadRequest)
		return
	}

	lastThirtyGraph, err := models.GetLastMonthHours(db, userIdNum)
	if err != nil {
		log.Printf("couldn't query last month hours of db_table: tasks %v", err)
		http.Error(w, "Couldn't query last month hours of db_table: tasks", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(lastThirtyGraph)
}

func GetTodaysTasksHandler(w http.ResponseWriter, req *http.Request) {
	userIdStr := req.URL.Query().Get("userId")
	if userIdStr == "" {
		http.Error(w, "Missing userId query", http.StatusBadRequest)
		return
	}

	userIdNum, err := strconv.Atoi(userIdStr)
	if err != nil {
		http.Error(w, "Invalid userId query", http.StatusBadRequest)
		return
	}

	db, err := server.InitDB(w)
	if err != nil {
		log.Printf("Couldn't open prod.db %v", err)
		http.Error(w, "Couldn't connect to prod.db", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	todaysTasks, err := models.GetSchedulePreview(db, userIdNum)
	if err != nil {
		log.Printf("Couldn't query db %v", err)
		http.Error(w, "Couldn't query prod.db", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(todaysTasks)
}

func GetAllTasksHandler(w http.ResponseWriter, req *http.Request) {
	userStr := req.URL.Query().Get("userId")
	if userStr == "" {
		http.Error(w, "Missing userId query", http.StatusBadRequest)
		return
	}

	userIdNum, err := strconv.Atoi(userStr)
	if err != nil {
		log.Printf("Couldn't convert userId to num %v", err)
		http.Error(w, "Couldn't convert userId to num", http.StatusInternalServerError)
		return
	}

	db, err := server.InitDB(w)
	if err != nil {
		log.Printf("Couldn't open prod.db %v", err)
		http.Error(w, "Couldn't connect to prod.db", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	tasks, err := models.GetAllTasks(db, userIdNum)
	if err != nil {
		log.Printf("Couldn't retrieve all tasks: \n%v", err)
		http.Error(w, "Couldn't retrieve all tasks", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tasks)
}
