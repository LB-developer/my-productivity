package config

import (
	"flag"
)

const version = "1.0.0"

type Config struct {
	Port int
	Env  string
	DB   struct {
		Path         string
		MaxOpenConns int
		MaxIdleConns int
		MaxIdleTime  string
	}
}

func LoadConfig() *Config {
	var cfg Config

	flag.IntVar(&cfg.Port, "port", 8080, "API server port")
	flag.StringVar(&cfg.Env, "env", "development", "Environment (development|staging|production)")
	flag.StringVar(&cfg.DB.Path, "dbpath", "../../db/prod.db", "SQLite DB Path")

	flag.IntVar(&cfg.DB.MaxOpenConns, "db-max-open-conns", 25, "SQLite max open connections")
	flag.IntVar(&cfg.DB.MaxIdleConns, "db-max-idle-conns", 25, "SQLite max idle connections")
	flag.StringVar(&cfg.DB.MaxIdleTime, "db-max-idle-time", "15m", "SQLite max connection idle time")

	flag.Parse()

	return &cfg
}
