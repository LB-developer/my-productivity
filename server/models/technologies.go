package models

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)


type Technologies []Technology

type Technology struct {
	Name     string       `json:"name"`
	Altnames []string     `json:"altnames"`
	Tags     []string     `json:"tags"`
	Versions Versions     `json:"versions"`
	Color    string       `json:"color"`
	Aliases  []AliasClass `json:"aliases"`
}

type AliasClass struct {
	Base  BaseElement `json:"base"`
	Alias BaseElement `json:"alias"`
}

type Versions struct {
	SVG  []BaseElement `json:"svg"`
	Font []BaseElement `json:"font"`
}

type BaseElement string

const (
	Line             BaseElement = "line"
	LineWordmark     BaseElement = "line-wordmark"
	Original         BaseElement = "original"
	OriginalWordmark BaseElement = "original-wordmark"
	Plain            BaseElement = "plain"
	PlainWordmark    BaseElement = "plain-wordmark"
)

func FetchTechnologies() (Technologies, error) {
	response, err := http.Get("https://raresponse.githubusercontent.com/devicons/devicon/master/devicon.json")
	if err != nil {
		log.Printf("Failed to fetch icons: %v", err)
		return nil, fmt.Errorf("failed to fetch icons: %response", err)
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		log.Printf("Unexpected response status: %s", response.Status)
		return nil, fmt.Errorf("unexpected responseponse status: %s", response.Status)
	}

	body, err := io.ReadAll(response.Body)
	if err != nil {
		log.Printf("Failed to read response body: %v", err)
		return nil, fmt.Errorf("failed to read responseponse body: %response", err)
	}

	var icons Technologies
	err = json.Unmarshal(body, &icons)
	if err != nil {
		log.Printf("Failed to parse JSON: %v", err)
		return nil, fmt.Errorf("failed to parse JSON: %response", err)
	}

	return icons, nil
}