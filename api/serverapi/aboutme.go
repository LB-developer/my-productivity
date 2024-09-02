package serverapi

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

func GetAboutMeHandler(res http.ResponseWriter, req *http.Request) {

	db, err := sql.Open("sqlite3", "server/db/test_database.db")
	if err != nil {
		log.Print(err)
	}

	rows, err := db.Query("SELECT * FROM info")
	if err != nil {
		log.Printf("Could not query db_table: %s\n %v","info", err)
	}
	defer rows.Close()
	
	var aboutMe PersonalInfo
	for rows.Next() {
		if err := rows.Scan(
			&aboutMe.ID, 
			&aboutMe.Name, 
			&aboutMe.Role,
			&aboutMe.SimpleBlurb,
			&aboutMe.DetailedBlurb,
			&aboutMe.Location,
			&aboutMe.Github,
			&aboutMe.Linkedin,
			&aboutMe.Email,
			&aboutMe.Picture); err != nil {
				fmt.Printf("info %q: %v", aboutMe.Name, err)
			}
	}
	res.Header().Set("Content-Type", "application/json")
  err = json.NewEncoder(res).Encode(aboutMe)
	if err != nil {
		http.Error(res, "Failed to encode JSON", http.StatusInternalServerError)
	}
}

func UpdateAboutMeHandler(res http.ResponseWriter, req *http.Request) {
	body, err := io.ReadAll(req.Body)
	if err != nil {
		http.Error(res, "Unable to read request body", http.StatusBadRequest)
		return
	}
	if len(body) == 0 {
		http.Error(res, "Request body is empty", http.StatusBadRequest)
		return
	}

	db, err := sql.Open("sqlite3", "server/db/test_database.db")
	if err != nil {
		log.Fatal(err)
	}

	var updatedData PersonalInfoWithoutId
	err = json.Unmarshal(body, &updatedData)
	if err != nil {
		http.Error(res, "Unable to parse JSON", http.StatusBadRequest)
		return
	}

	_, err = db.Exec("UPDATE info SET name = ?,role = ?, simple_blurb = ?, detailed_blurb = ?, location = ?,github_acc_link = ?,linkedin_link = ?,email_link = ?,picture_url = ?",
	&updatedData.Name, 
	&updatedData.Role,
	&updatedData.SimpleBlurb,
	&updatedData.DetailedBlurb,
	&updatedData.Location,
	&updatedData.Github,
	&updatedData.Linkedin,
	&updatedData.Email,
	&updatedData.Picture,
	)
	if err != nil {
		log.Fatal(err)
	}
}

func fetchTechnologies() (Technologies, error) {
		resp, err := http.Get("https://raw.githubusercontent.com/devicons/devicon/master/devicon.json")
    if err != nil {
        log.Printf("Failed to fetch icons: %v", err) // Log exact error
        return nil, fmt.Errorf("failed to fetch icons: %w", err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        log.Printf("Unexpected response status: %s", resp.Status)
        return nil, fmt.Errorf("unexpected response status: %s", resp.Status)
    }

    body, err := io.ReadAll(resp.Body)
    if err != nil {
        log.Printf("Failed to read response body: %v", err)
        return nil, fmt.Errorf("failed to read response body: %w", err)
    }

    var icons Technologies
    err = json.Unmarshal(body, &icons)
    if err != nil {
        log.Printf("Failed to parse JSON: %v", err)
        return nil, fmt.Errorf("failed to parse JSON: %w", err)
    }

    return icons, nil
}

func GetTechnologiesHandler(res http.ResponseWriter, req *http.Request) {
	icons, err := fetchTechnologies()
	if err != nil {
		http.Error(res, "Failed to fetch technologies", http.StatusInternalServerError)
		return
	}

	res.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(res).Encode(icons)
	if err != nil {
		http.Error(res, "Failed to encode JSON", http.StatusInternalServerError)
	}
}


