package models

import (
	"database/sql"
	"log"
	"reflect"
)

type LastThirtyInGraph struct {
	Id    string        `json:"id"`
	Color string        `json:"color"`
	Data  []Coordinates `json:"data"`
}

type Coordinates struct {
	X string  `json:"x"`
	Y float64 `json:"y"`
}

func GetLastMonthHours(db *sql.DB, userPublicID string) ([]LastThirtyInGraph, error) {
	// get sum of hours for completed tasks within in the last 30 days
	// uncompleted tasks contribute 0 to total time
	// returned format is: MM/DD | Hours
	query := `
	SELECT 
	strftime('%m/%d', study_date) AS month,
	SUM(
		CASE 
			WHEN is_completed = 1 THEN (strftime('%s', study_length) - strftime('%s', '00:00:00')) / 3600
			ELSE 0
		END
		) AS total_time
	FROM tasks 
	WHERE user_id = ? 
	AND julianday('now') - julianday(study_date) BETWEEN -1 AND 29 -- -1 to account for handling US based date
	GROUP BY
	month;`

	rows, err := db.Query(query, userPublicID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var lastThirtyGraph []LastThirtyInGraph
	var lastThirty LastThirtyInGraph
	lastThirty.Id = "history" // id property for nivo graph struct
	lastThirty.Color = "blue" // color property ^
	for rows.Next() {
		var month string
		var totalTime float64
		if err := rows.Scan(&month, &totalTime); err != nil {
			return nil, err
		}
		coord := Coordinates{
			X: month,
			Y: totalTime,
		}
		lastThirty.Data = append(lastThirty.Data, coord)
	}
	lastThirtyGraph = append(lastThirtyGraph, lastThirty)

	return lastThirtyGraph, nil
}

type Task struct {
	TaskID             int           `json:"taskId"`
	Deadline           string        `json:"deadline"`
	TaskName           string        `json:"taskName"`
	ContextType        string        `json:"contextType"`
	ContextID          int           `json:"contextId"`
	Priority           int           `json:"priority"`
	ParentTaskID       sql.NullInt64 `json:"parentTaskid"`
	MilestoneID        sql.NullInt64 `json:"milestoneId"`
	EstHoursToComplete sql.NullInt64 `json:"estHoursToComplete"`
	IsCompleted        bool          `json:"isCompleted"`
	InProgress         bool          `json:"inProgress"`
	CreateAt           string        `json:"createdAt"`
	CreatedAt          string        `json:"createdAt"`
	UpdatedAt          string        `json:"updatedAt"`
}

func GetPriorityTasks(db *sql.DB, userPublicID string) ([]Task, error) {
	query := `
	SELECT 
		tasks.id AS "TaskID",
		tasks.name AS "TaskName",
		tasks.deadline AS "Deadline",
		tasks.context_type AS "ContextType",
		tasks.context_id AS "ContextID",
		tasks.priority AS "Priority",
		tasks.parent_task_id AS "ParentTaskID",
		tasks.milestone_id AS "MileStoneID",
		tasks.est_hours_to_complete AS "EstHoursToComplete",
		tasks.is_completed AS "IsCompleted",
		tasks.in_progress AS "InProgress",
		tasks.created_at AS "CreatedAt",
		tasks.updated_at AS "UpdatedAt"
	FROM 
		tasks 
	WHERE 
		tasks.user_id = ? 
	ORDER BY 
		Priority
	LIMIT 
		3
	`

	rows, err := db.Query(query, userPublicID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var todaysTasks []Task
	for rows.Next() {
		var task Task
		if err := rows.Scan(
			&task.TaskID,
			&task.TaskName,
			&task.ContextType,
			&task.ContextID,
			&task.Priority,
			&task.ParentTaskID,
			&task.MilestoneID,
			&task.EstHoursToComplete,
			&task.IsCompleted,
			&task.InProgress,
		); err != nil {
			return nil, err
		}
		todaysTasks = append(todaysTasks, task)
	}

	return todaysTasks, nil
}

type ParentTask struct {
	Parent   Task
	SubTasks []Task
}

func GetAllTasks(db *sql.DB, userPublicID string) ([][]Task, error) {
	query := `
	SELECT 
		tasks.id AS "TaskID",
		tasks.name AS "TaskName",
		tasks.deadline AS "Deadline",
		tasks.context_type AS "ContextType",
		tasks.context_id AS "ContextID",
		tasks.priority AS "Priority",
		tasks.parent_task_id AS "ParentTaskID",
		tasks.milestone_id AS "MileStoneID",
		tasks.est_hours_to_complete AS "EstHoursToComplete",
		tasks.is_completed AS "IsCompleted",
		tasks.in_progress AS "InProgress",
		tasks.created_at AS "CreatedAt",
		tasks.updated_at AS "UpdatedAt"
	FROM 
		tasks 
	WHERE 
		tasks.user_id = ? 
	AND 
		IsCompleted = ?
	`
	// get completed tasks
	rows, err := db.Query(query, userPublicID, 1)
	if err != nil {
		log.Printf("Couldn't query db_table tasks courses %v", err)
		return nil, err
	}
	defer rows.Close()

	var completedTasks []Task
	for rows.Next() {
		var completedTask Task
		if err := rows.Scan(
			&completedTask.TaskID,
			&completedTask.TaskName,
			&completedTask.ContextType,
			&completedTask.ContextID,
			&completedTask.Priority,
			&completedTask.ParentTaskID,
			&completedTask.MilestoneID,
			&completedTask.EstHoursToComplete,
			&completedTask.IsCompleted,
			&completedTask.InProgress,
		); err != nil {
			return nil, err
		}

		completedTasks = append(completedTasks, completedTask)
	}

	// get incomplete tasks
	incompletedRows, err := db.Query(query, userPublicID, 0)
	if err != nil {
		log.Printf("Couldn't query db_table tasks courses %v", err)
		return nil, err
	}
	defer incompletedRows.Close()

	var incompleteTasks []Task
	for incompletedRows.Next() {
		var incompleteTask Task
		if err := rows.Scan(
			&incompleteTask.TaskID,
			&incompleteTask.TaskName,
			&incompleteTask.ContextType,
			&incompleteTask.ContextID,
			&incompleteTask.Priority,
			&incompleteTask.ParentTaskID,
			&incompleteTask.MilestoneID,
			&incompleteTask.EstHoursToComplete,
			&incompleteTask.IsCompleted,
		); err != nil {
			return nil, err
		}

		incompleteTasks = append(incompleteTasks, incompleteTask)
	}

	var allTasks [][]Task
	allTasks = append(allTasks, completedTasks, incompleteTasks)

	return allTasks, nil
}

type CreateTask struct {
	UserId       string
	Deadline     string
	TaskName     string
	ContextType  string
	ContextID    int
	Priority     int
	ParentTaskID sql.NullInt64
	MilestoneID  sql.NullInt64
	IsCompleted  bool
	InProgress   bool
}

type CreateTaskResponse struct {
	TaskId int64 `json:"taskId"`
}

// values are pointers to make them nullable
type DefaultTask struct {
	ContextID    *int
	ContextType  *string
	ParentTaskID *int
}

// Helper function to safely get the value or nil from a pointer field
func getFieldValue(field reflect.Value) interface{} {
	if field.Kind() == reflect.Ptr && !field.IsNil() {
		// Dereference the pointer and return the value
		return field.Elem().Interface()
	}
	// Return nil if the field is nil or not a pointer
	return nil
}

// Function to extract all field values from DefaultTask for database insertion
func prepareDBValues(task DefaultTask) []interface{} {
	v := reflect.ValueOf(task)

	values := make([]interface{}, v.NumField())
	for i := 0; i < v.NumField(); i++ {
		values[i] = getFieldValue(v.Field(i)) // Safely get the value or nil
	}
	return values
}

func CreateNewTask(db *sql.DB, userPublicID string, defaultTask DefaultTask) (CreateTaskResponse, error) {
	// get user id from the public id
	userIDQuery := `
	SELECT id
	FROM users
	WHERE public_id = ?
	`
	var userId int
	userIdRow := db.QueryRow(userIDQuery, userPublicID)
	err := userIdRow.Scan(&userId)
	if err != nil {
		return CreateTaskResponse{}, err
	}

	/*
	  defaultTask values are all pointers to allow nullability.
	  We cannot just dereference each value because dereferencing nil is not possible,
	  so we pass the struct to prepareDBValues which will return an interface of values either
	  -- The dereferenced value
	  -- nil

	  Values are returned in the following order:
	  0: ContextType
	  1: ContextID
	  2: ParentTaskID
	*/
	values := prepareDBValues(defaultTask)

	query := `
	INSERT INTO tasks (user_id, name, deadline, context_type, context_id, priority, parent_task_id) 
	VALUES
	(?, 'Untitled', datetime('now','+7 day','localtime'), ?, ?, 3, ?)
	RETURNING id AS taskId
	`

	taskCreated, err := db.Exec(query, userId, values[0], values[1], values[2])
	if err != nil {
		return CreateTaskResponse{}, err
	}

	taskId, err := taskCreated.LastInsertId()
	if err != nil {
		log.Printf("Failed to retrieve last insert id when creating task \n%v", err)
		return CreateTaskResponse{}, err
	}
	createdTaskId := CreateTaskResponse{
		TaskId: taskId,
	}
	return createdTaskId, nil
}
