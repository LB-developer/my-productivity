package router

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"

	"productivity/api/serverapi"
)

func SetupRoutes() *chi.Mux {
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
	router.Get("/api/v1/courses", serverapi.GetCoursesById)
	router.Get("/api/v1/courses/preview", serverapi.GetCoursesPreview)
	
	// Task routes
	router.Get("/api/v1/tasks/last-30", serverapi.GetLastMonthHours)

	// User routes
	router.Get("/api/v1/users/info", serverapi.UserWidgetInfo)

	// Schedule routes
	router.Get("/api/v1/schedules/preview", serverapi.GetSchedulePreview)

	// Technology routes
	router.Get("/api/v1/technologies", serverapi.GetTechnologiesHandler)
	
	return router
}