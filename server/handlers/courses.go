package handlers

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"strconv"

	server "productivity/server/db"
	"productivity/server/models"
)

func GetCoursesByIdHandler(w http.ResponseWriter, req *http.Request) {
	body, err := io.ReadAll(req.Body)
	if err != nil {
		log.Printf("Unable to read request body \n%v", err)
		http.Error(w, "Unable to read request body", http.StatusBadRequest)
		return
	}

	db, err := server.InitDB(w)
	if err != nil {
		log.Printf("Couldn't open database \n%v", err)
		http.Error(w, "Couldn't connect to database", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	var userId models.UserIDReq
	err = json.Unmarshal(body, &userId)
	if err != nil {
		log.Printf("Unable to parse JSON \n%v", err)
		http.Error(w, "Unable to parse JSON", http.StatusBadRequest)
		return
	}

	courses, err := models.GetCoursesById(db, userId)
	if err != nil {
		log.Printf("Could not fetch courses: %s\n %v", "courses", err)
		http.Error(w, "Could not fetch courses", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(courses)
	if err != nil {
		log.Printf("Failed to encode JSON \n%v", err)
		http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
		return
	}
}

func GetCoursesPreviewHandler(w http.ResponseWriter, req *http.Request) {
	userIdStr := req.URL.Query().Get("userId")

	userIdNum, err := strconv.Atoi(userIdStr)
	if err != nil {
		log.Printf("Couldn't convert userId to num \n%v", err)
		http.Error(w, "Couldn't convert userId to num", http.StatusInternalServerError)
		return
	}

	db, err := server.InitDB(w)
	if err != nil {
		log.Printf("Couldn't connect to database prod.db \n%v", err)
		http.Error(w, "Couldn't open database", http.StatusInternalServerError)
		return
	}
	defer db.Close()

	coursePreview, err := models.FetchCoursesPreview(db, userIdNum)
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
	}
}
