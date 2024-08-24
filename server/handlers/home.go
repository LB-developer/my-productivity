package handlers

import (
	"log"
	"net/http"
	"text/template"
)

type HomeContent struct {
	Title string
	Heading string
	Content string
}

func HomeHandler(res http.ResponseWriter, req *http.Request) {
	tmpl, err := template.ParseFiles("client/templates/index.html")
	if err != nil {
		log.Fatal(err)
	}

	testContent := HomeContent{
		Title: "Logan's Test Portfolio",
		Heading: "Homepage Heading",
		Content: "Test Content",
	}

	tmpl.Execute(res, testContent)
}