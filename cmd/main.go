package main

import (
	"fmt"
	"net/http"
	"productivity/server/router"
)


func main() {
	r := router.SetupRoutes()
	fmt.Println("Starting Server 8080")
    http.ListenAndServe(":8080", r)
}

