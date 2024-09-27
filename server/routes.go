package server

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"

	"github.com/POR7ALa/my-productivity/api/serverapi"
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
	
	router.Get("/api/v1/courses", serverapi.GetCoursesById)
	
	
	return router
}