CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    schedule_id INTEGER,
    user_id INTEGER,
    study_length TEXT, 
    study_date TEXT,  
    course_id INTEGER,
    is_completed BOOLEAN,
    FOREIGN KEY (schedule_id) REFERENCES schedule(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);