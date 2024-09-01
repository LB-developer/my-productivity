package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

func Seed() {
	
	db, err := sql.Open("sqlite3", "server/db/test_database.db")
	if err != nil {
		log.Fatalf("Could not connect to database: %v", err)
	}
	defer db.Close()

	seedFiles := []string{
		"server/db/seed/001_seed_initial_test_data.sql",
		"server/db/seed/002_seed_initial_test_info_data.sql",
		"server/db/seed/003_seed_initial_technologies_data.sql",
	}

	for _, seedFile := range seedFiles {
		fmt.Println("Attempting to read:", seedFile)

		if err := runSeed(db, seedFile); err != nil {
			log.Fatalf("Could not seed files %s: %v\n", seedFile, err)
		}
	}
}

func runSeed(db *sql.DB, seedFile string) error {
	seed, err := os.ReadFile(seedFile)
	if err != nil {
		return err
	} 

	_, err = db.Exec(string(seed))
	if err != nil {
		return err
	}

	log.Printf("Successfully applied seed: %s\n", seedFile)
	return nil
}