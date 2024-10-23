CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    task_name TEXT,
    study_length TEXT, 
    study_date TEXT,  
    course_id INTEGER,
    is_completed BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES users(public_id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);
