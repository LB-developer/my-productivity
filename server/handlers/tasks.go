package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

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

	userPublicID := req.URL.Query().Get("userId")
	if userPublicID == "" {
		http.Error(w, "Missing userId query", http.StatusBadRequest)
		return
	}

	lastThirtyGraph, err := models.GetLastMonthHours(db, userPublicID)
	if err != nil {
		log.Printf("couldn't query last month hours of db_table: tasks %v", err)
		http.Error(w, "Couldn't query last month hours of db_table: tasks", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(lastThirtyGraph)
}

func GetTodaysTasksHandler(w http.ResponseWriter, req *http.Request) {
	userPublicID := req.URL.Query().Get("userId")
	if userPublicID == "" {
		http.Error(w, "Missing userId query", http.StatusBadRequest)
		return
	}

	db, err := server.InitDB(w)
	if err != nil {
		log.Printf("Couldn't open prod.db %v", err)
		http.Error(w, "Couldn't connect to prod.db", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	todaysTasks, err := models.GetSchedulePreview(db, userPublicID)
	if err != nil {
		log.Printf("Couldn't query db %v", err)
		http.Error(w, "Couldn't query prod.db", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(todaysTasks)
}

func GetAllTasksHandler(w http.ResponseWriter, req *http.Request) {
	userPublicID := req.URL.Query().Get("userId")
	if userPublicID == "" {
		http.Error(w, "Missing userId query", http.StatusBadRequest)
		return
	}

	db, err := server.InitDB(w)
	if err != nil {
		log.Printf("Couldn't open prod.db %v", err)
		http.Error(w, "Couldn't connect to prod.db", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	tasks, err := models.GetAllTasks(db, userPublicID)
	if err != nil {
		log.Printf("Couldn't retrieve all tasks: \n%v", err)
		http.Error(w, "Couldn't retrieve all tasks", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tasks)
}

func CreateNewTaskHandler(w http.ResponseWriter, req *http.Request) {
	userPublicID := req.URL.Query().Get("userId")
	if userPublicID == "" {
		http.Error(w, "Missing userId query", http.StatusBadRequest)
		return
	}

	db, err := server.InitDB(w)
	if err != nil {
		fmt.Printf("Couldn't open database when creating new task \n%v", err)
		http.Error(w, "Couldn't open database when creating new task", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	// pass off the creation to our db function
	taskId, err := models.CreateNewTask(db, userPublicID)
	if err != nil {
		fmt.Printf("Couldn't insert new task into db \n%v", err)
		http.Error(w, "Couldn't insert new task into db \n%v", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(taskId)
}
