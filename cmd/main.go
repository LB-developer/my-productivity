package main

import (
	"fmt"
	"log"
	"net/http"

	"productivity/server/app"
	"productivity/server/router"
)

func main() {
	app := app.NewApp()
	defer app.DB.Close()

	app.DB.Ping()
	router := router.SetupRoutes(app.DB)

	fmt.Println("Starting Server 8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}
