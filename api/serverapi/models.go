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

type PersonalInfo struct {
	ID         		  int    `json:"id"`
	Name  		  		string `json:"Name"`
	Role		  		  string `json:"Role"`
	SimpleBlurb			string `json:"SimpleBlurb"`
	DetailedBlurb		string `json:"DetailedBlurb"`
	Location  		  string `json:"Location"`
	Github 		  		string `json:"Github"`
	Linkedin 				string `json:"Linkedin"`
	Email     		  string `json:"Email"`
	Picture  				string `json:"Picture"`
}

type PersonalInfoWithoutId struct {
	Name	 		  		string 
	Role		  			string 
	SimpleBlurb			string
	DetailedBlurb		string
	Location  			string 
	Github 					string 
	Linkedin 				string 
	Email     			string 
	Picture  				string 
	Technologies   	string 
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
