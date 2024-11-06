package models_test

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"strings"
	"testing"

	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

func TestMain(m *testing.M) {
	var err error
	db, err = sql.Open("sqlite3", ":memory:")
	if err != nil {
		log.Fatalf("Could not open SQLite database: %v", err)
	}

	/*
		NOTE: .read seems to only be possible with the sqlite CLI and as such
		 adding the pre-made all_seeds/migrations.sql files (which were created to stop this manual process)
		 is not possible
	*/
	// Populate the memory db with migrations and seeds
	migrationFiles := []string{
		"../migrate/001_create_users_table.up.sql",
		"../migrate/002_create_schedule_table.up.sql",
		"../migrate/003_create_courses_table.up.sql",
		"../migrate/004_create_tasks_table.up.sql",
		"../migrate/005_create_projects_table.up.sql",
		"../migrate/006_create_technologies_table.up.sql",
		"../migrate/008_create_notes_table.up.sql",
		"../migrate/009_create_milestones_table.up.sql",
		"../migrate/010_create_roadmaps_table.up.sql",
		"../migrate/011_create_sessions_table.up.sql",
		"../migrate/012_create_tags_table.up.sql",
		"../migrate/013_create_tag_assignments_table.up.sql",
	}
	seedFiles := []string{
		"../seed/001_seed_users_data.sql",
		"../seed/002_seed_schedule_data.sql",
		"../seed/003_seed_courses_data.sql",
		"../seed/004_seed_tasks_data.sql",
		"../seed/005_seed_projects_data.sql",
		"../seed/006_seed_technologies_data.sql",
		"../seed/008_seed_notes_data.sql",
		"../seed/009_seed_roadmaps_data.sql",
		"../seed/010_seed_milestones_data.sql",
		"../seed/011_seed_sessions_data.sql",
		"../seed/012_seed_tags_data.sql",
		"../seed/013_seed_tag_assignments_data.sql",
	}

	err = applySQLFiles(migrationFiles)
	if err != nil {
		log.Fatalf("Could not run migrations: %v", err)
	}
	err = applySQLFiles(seedFiles)
	if err != nil {
		log.Fatalf("Could not run seeds: %v", err)
	}

	// Run the tests
	code := m.Run()
	// Cleanup and close
	db.Close()
	os.Exit(code)
}

// applySQLFiles reads and applies each SQL file to the testing database
func applySQLFiles(files []string) error {
	for _, file := range files {
		content, err := os.ReadFile(file)
		if err != nil {
			return fmt.Errorf("Failed to read file %v: %v", file, err)
		}
		// Execute each command in the file
		commands := strings.Split(string(content), ";")
		for _, cmd := range commands {
			trimmedCmd := strings.TrimSpace(cmd)
			if trimmedCmd == "" {
				continue
			}
			if _, err := db.Exec(trimmedCmd); err != nil {
				return fmt.Errorf("Failed to execute command in file %v: %v", file, err)
			}
		}
	}
	return nil
}

func TestCourseSelection(t *testing.T) {
	var userId int
	// Check if the setup was successful by finding the user id of our test user
	err := db.QueryRow("SELECT id FROM users WHERE public_id = 'user_wd0kglpl'").Scan(&userId)
	if err != nil {
		t.Fatalf("Could not query database: %v", err)
	}

	if userId != 1 {
		t.Fatalf("Expected user id to be '1', got '%v'", userId)
	}

	// Check if the number of distinct courses is as expected
	var numberOfCourses int
	if err := db.QueryRow("SELECT DISTINCT COUNT(id) FROM courses").Scan(&numberOfCourses); err != nil {
		t.Fatalf("Could not query database: %v", err)
	}

	if numberOfCourses != 4 {
		t.Fatalf("Expected number of distinct courses to be '4', got '%v'", numberOfCourses)
	}
}
