package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"productivity/server/models"
)

func (h *Handler) GetLastMonthHoursHandler(w http.ResponseWriter, req *http.Request) {
	userPublicID := req.URL.Query().Get("publicUserId")
	if userPublicID == "" {
		http.Error(w, "Missing publicUserId query", http.StatusBadRequest)
		return
	}

	lastThirtyGraph, err := models.GetLastSevenHours(h.DB, userPublicID)
	if err != nil {
		log.Printf("couldn't query last month hours of db_table: tasks %v", err)
		http.Error(w, "Couldn't query last month hours of db_table: tasks", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(lastThirtyGraph)
}

func (h *Handler) GetTodaysTasksHandler(w http.ResponseWriter, req *http.Request) {
	userPublicID := req.URL.Query().Get("publicUserId")
	if userPublicID == "" {
		http.Error(w, "Missing userId query", http.StatusBadRequest)
		return
	}

	todaysTasks, err := models.GetPriorityTasks(h.DB, userPublicID)
	if err != nil {
		log.Printf("Couldn't query db %v", err)
		http.Error(w, "Couldn't query prod.db", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(todaysTasks)
}

func (h *Handler) GetAllTasksHandler(w http.ResponseWriter, req *http.Request) {
	userPublicID := req.URL.Query().Get("publicUserId")
	if userPublicID == "" {
		http.Error(w, "Missing userId query", http.StatusBadRequest)
		return
	}

	tasks, err := models.GetAllTasks(h.DB, userPublicID)
	if err != nil {
		log.Printf("Couldn't retrieve all tasks: \n%v", err)
		http.Error(w, "Couldn't retrieve all tasks", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tasks)
}

func (h *Handler) CreateNewTaskHandler(w http.ResponseWriter, req *http.Request) {
	userPublicID := req.URL.Query().Get("publicUserId")
	if userPublicID == "" {
		http.Error(w, "Missing userPublicId query", http.StatusBadRequest)
		return
	}

	// The only valid media type is app/json
	ct := req.Header.Get("Content-Type")
	if ct != "" {
		mediaType := strings.ToLower(strings.TrimSpace(strings.Split(ct, ";")[0]))
		if mediaType != "application/json" {
			http.Error(w, "Content-Type header is not application/json", http.StatusUnsupportedMediaType)
			return
		}
	}

	// Set maximum body size of 1MB
	req.Body = http.MaxBytesReader(w, req.Body, 1048576)

	// Should the field contain unknown fields the program will return with an error stating as much
	dec := json.NewDecoder(req.Body)
	dec.DisallowUnknownFields()

	var defaultTask models.DefaultTask
	err := dec.Decode(&defaultTask)
	if err != nil {
		log.Printf("Couldn't decode the request body of a new task \n%v", err)
		http.Error(w, "Couldn't decode the request body of a new task", http.StatusInternalServerError)
		return
	}

	// pass off the creation to our db function
	taskId, err := models.CreateNewTask(h.DB, userPublicID, defaultTask)
	if err != nil {
		fmt.Printf("Couldn't insert new task into db \n%v", err)
		http.Error(w, "Couldn't insert new task into db \n%v", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(taskId)
}
