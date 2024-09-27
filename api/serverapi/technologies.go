package serverapi

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

func FetchTechnologies() (Technologies, error) {
		w, err := http.Get("https://raw.githubusercontent.com/devicons/devicon/master/devicon.json")
    if err != nil {
        log.Printf("Failed to fetch icons: %v", err) // Log exact error
        return nil, fmt.Errorf("failed to fetch icons: %w", err)
    }
    defer w.Body.Close()

    if w.StatusCode != http.StatusOK {
        log.Printf("Unexpected response status: %s", w.Status)
        return nil, fmt.Errorf("unexpected wponse status: %s", w.Status)
    }

    body, err := io.ReadAll(w.Body)
    if err != nil {
        log.Printf("Failed to read response body: %v", err)
        return nil, fmt.Errorf("failed to read wponse body: %w", err)
    }

    var icons Technologies
    err = json.Unmarshal(body, &icons)
    if err != nil {
        log.Printf("Failed to parse JSON: %v", err)
        return nil, fmt.Errorf("failed to parse JSON: %w", err)
    }

    return icons, nil
}

func GetTechnologiesHandler(w http.ResponseWriter, req *http.Request) {
	icons, err := FetchTechnologies()
	if err != nil {
		http.Error(w, "Failed to fetch technologies", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(icons)
	if err != nil {
		http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
	}
}