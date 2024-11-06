package models

import (
	"database/sql"
	"errors"
)

var ErrRecordfNotFound = errors.New("record not found")

type Models struct {
	Courses  CourseModel
	Tasks    TaskModel
	Projects ProjectModel
	Users    UserModel
}

func NewModels(db *sql.DB) Models {
	return Models{
		Courses:  CourseModel{DB: db},
		Tasks:    TaskModel{DB: db},
		Projects: ProjectModel{DB: db},
		Users:    UserModel{DB: db},
	}
}
