package serverapi

type Project struct {
	ID           int    `json:"id"`
	Name         string `json:"name"`
	Description  string `json:"description"`
	Technologies string `json:"technologies"`
	GithubLink   string `json:"github_link"`
	DemoLink     string `json:"DemoLink"`
	ImageURL		 string `json:"image_url"`
	Status       string `json:"status"`
}

type Course struct {
	ID              int    `json:"id"`
	UserID          int    `json:"userId"`
	Name            string `json:"name"`
	Price           string `json:"price"`
	Author          string `json:"author"`
	Link            string `json:"link"`
	HoursToComplete int    `json:"hoursToComplete"`
	HoursCompleted  int    `json:"hoursCompleted"`
}

type UserIDReq struct {
	UserID int `json:"userId"`
}

type LastThirtyHoursInMinutes struct {
	Hours int `json:"hoursAsMinutes"`
}

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
