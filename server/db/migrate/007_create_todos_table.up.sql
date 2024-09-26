CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER,
    description TEXT,
    priority INTEGER,
    FOREIGN KEY (project_id) REFERENCES projects(id)
);