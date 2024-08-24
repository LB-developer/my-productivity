package server

import (
	"net/http"

	"github.com/POR7ALa/portfolio/server/handlers"
)

func SetupRoutes() {
	http.HandleFunc("/", handlers.HomeHandler)
}