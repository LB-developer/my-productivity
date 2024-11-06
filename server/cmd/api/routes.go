package main

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
)

func (app *application) routes() *chi.Mux {
	router := chi.NewRouter()

	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	// Course routes
	router.Get("/api/v1/courses/preview", app.GetCoursesPreviewHandler)

	// Task routes
	router.Get("/api/v1/tasks", app.GetAllTasksHandler)
	router.Get("/api/v1/tasks/last-30", app.GetLastMonthHoursHandler)
	router.Get("/api/v1/tasks/preview", app.GetTodaysTasksHandler)
	router.Put("/api/v1/tasks/create-task", app.CreateNewTaskHandler)

	// User routes
	router.Get("/api/v1/users/info", app.UserWidgetInfoHandler)

	// Technology routes
	router.Get("/api/v1/technologies", app.GetTechnologiesHandler)

	return router
}
