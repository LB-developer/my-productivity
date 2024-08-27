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
	Name  		  string `json:"Name"`
	LastName   		  string `json:"Last_name"`
	Role		  		  string `json:"Role"`
	Location  		  string `json:"Location"`
	Github 		  string `json:"Github"`
	Linkedin 		string `json:"Linkedin"`
	Email     		  string `json:"Email"`
	Picture  				string `json:"Picture"`
	FavTechnologies string `json:"Fav_technologies"`
}

type PersonalInfoWithoutId struct {
	Name	 		  string 
	Last_name   string 
	Role		  	string 
	Location  	string 
	Github 			string 
	Linkedin 		string 
	Email     	string 
	Picture  		string 
	Technologies   string 
}