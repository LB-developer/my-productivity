package server

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"

	"github.com/POR7ALa/portfolio/api/serverapi"
)

func SetupRoutes() *chi.Mux {
	router := chi.NewRouter()

	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, 
}))

	router.Get("/api/v1/projects", serverapi.GetProjectsHandler)
	router.Get("/api/v1/about-me", serverapi.GetAboutMeHandler)
	return router
}