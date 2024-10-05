package server

import (
	"database/sql"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
)


func InitDB(w http.ResponseWriter) (*sql.DB, error) {
	db, err := sql.Open("sqlite3", "../server/db/prod.db")
	return db, err
}