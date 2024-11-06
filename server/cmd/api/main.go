package main

import (
	"context"
	"database/sql"
	"fmt"
	"net/http"
	"os"
	"time"

	config "productivity/server/internal/config"
	"productivity/server/internal/jsonlog"
	"productivity/server/internal/models"
)

type application struct {
	config config.Config
	logger *jsonlog.Logger
	db     *sql.DB
	models models.Models
}

func main() {
	// est config
	cfg := config.LoadConfig()
	// define logger
	logger := jsonlog.New(os.Stdout, jsonlog.LevelInfo)
	// open db connection pool
	db, err := openDB(cfg)
	if err != nil {
		logger.PrintFatal(err, nil)
	}
	defer db.Close()

	logger.PrintInfo("database connection pool established", nil)

	app := &application{
		config: *cfg,
		logger: logger,
		db:     db,
	}

	err = app.serve(*cfg)
	if err != nil {
		logger.PrintFatal(err, nil)
	}
}

func openDB(cfg *config.Config) (*sql.DB, error) {
	db, err := sql.Open("sqlite3", cfg.DB.Path)
	if err != nil {
		return nil, err
	}

	db.SetMaxOpenConns(cfg.DB.MaxOpenConns)
	db.SetMaxIdleConns(cfg.DB.MaxIdleConns)

	duration, err := time.ParseDuration(cfg.DB.MaxIdleTime)
	if err != nil {
		return nil, err
	}
	db.SetConnMaxIdleTime(duration)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err = db.PingContext(ctx)
	if err != nil {
		return nil, err
	}

	return db, nil
}

func (app *application) serve(cfg config.Config) error {
	router := app.routes()

	srv := &http.Server{
		Addr:         fmt.Sprintf(":%d", cfg.Port),
		Handler:      router,
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	app.logger.PrintInfo("starting server", map[string]string{
		"addr": srv.Addr,
		"env":  cfg.Env,
	})

	return srv.ListenAndServe()
}
