package server

import (
	"fmt"
	"net/http"
)

func StartServer() {
	r := SetupRoutes()
	fmt.Println("Starting Server 8080")
  http.ListenAndServe(":8080", r)
}