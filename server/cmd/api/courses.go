package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func (app *application) GetCoursesByIdHandler(w http.ResponseWriter, req *http.Request) {
	userPublicID := req.URL.Query().Get("publicUserId")
	if userPublicID == "" {
		http.Error(w, "Missing userId query", http.StatusBadRequest)
		return
	}

	courses, err := app.models.Courses.GetCoursesByUserId(userPublicID)
	if err != nil {
		log.Printf("Could not fetch courses: %s\n %v", "courses", err)
		http.Error(w, "Could not fetch courses", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(courses)
	if err != nil {
		log.Printf("Failed to encode JSON for all courses %v", err)
		http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
		return
	}
}

func (app *application) GetCoursesPreviewHandler(w http.ResponseWriter, req *http.Request) {
	userPublicID := req.URL.Query().Get("publicUserId")
	if userPublicID == "" {
		http.Error(w, "Missing userId query", http.StatusBadRequest)
		return
	}

	coursePreview, err := app.models.Courses.GetCoursesPreview(userPublicID)
	if err != nil {
		log.Printf("Couldn't fetch courses preview: \n%v", err)
		http.Error(w, "Couldn't fetch courses preview", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(coursePreview)
	if err != nil {
		log.Printf("Failed to encode JSON %v", err)
		http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
		return
	}
}
