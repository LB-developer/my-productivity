package models

import (
	"database/sql"
	"fmt"
)

type Project struct {
	ID           int    `json:"id"`
	Name         string `json:"name"`
	Description  string `json:"description"`
	Technologies string `json:"technologies"`
	GithubLink   string `json:"github_link"`
	DemoLink     string `json:"DemoLink"`
	ImageURL     string `json:"image_url"`
	Status       string `json:"status"`
}

func GetProjects(db *sql.DB) ([]Project, error) {

	query := `
	SELECT *
	FROM projects
	`

	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var projects []Project
	for rows.Next() {
		var project Project
		if err := rows.Scan(
			&project.ID,
			&project.Name,
			&project.Description,
			&project.Technologies,
			&project.GithubLink,
			&project.DemoLink,
			&project.ImageURL,
			&project.Status); err != nil {
			fmt.Printf("projects %q: %v", project.Name, err)
			return nil, err
		}
		projects = append(projects, project)
	}

	return projects, nil
}