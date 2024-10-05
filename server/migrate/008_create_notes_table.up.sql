CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER,
    description TEXT,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);