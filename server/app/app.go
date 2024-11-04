package app

import (
	"database/sql"
	"log"
)

type App struct {
	DB *sql.DB
}

func NewApp() *App {
	db, err := sql.Open("sqlite3", "../server/db/prod.db")
	if err != nil {
		log.Fatalf("Couldn't connect to db -- err: %s", err)
	}

	return &App{
		DB: db,
	}
}
