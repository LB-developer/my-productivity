package router

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"

	"productivity/server/handlers"
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
	router.Get("/api/v1/courses", handlers.GetCoursesByIdHandler)
	router.Get("/api/v1/courses/preview", handlers.GetCoursesPreviewHandler)

	// Task routes
	router.Get("/api/v1/tasks", handlers.GetAllTasksHandler)
	router.Get("/api/v1/tasks/last-30", handlers.GetLastMonthHoursHandler)
	router.Get("/api/v1/tasks/preview", handlers.GetTodaysTasksHandler)
	router.Put("/api/v1/tasks/create-task", handlers.CreateNewTaskHandler)

	// User routes
	router.Get("/api/v1/users/info", handlers.UserWidgetInfoHandler)

	// Technology routes
	router.Get("/api/v1/technologies", handlers.GetTechnologiesHandler)

	return router
}
