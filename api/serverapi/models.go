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
	FirstName  		  string `json:"first_name"`
	LastName   		  string `json:"last_name"`
	Role		  		  string `json:"role"`
	Location  		  string `json:"location"`
	GithubLink 		  string `json:"github_acc_link"`
	LinkedInLink 		string `json:"linkedin_link"`
	Email     		  string `json:"email_link"`
	Picture  				string `json:"image_url"`
	FavTechnologies string `json:"fav_technologies"`
}