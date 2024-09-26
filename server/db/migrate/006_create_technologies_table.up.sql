CREATE TABLE technologies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER,
    name TEXT,
    image_link TEXT,
    FOREIGN KEY (project_id) REFERENCES projects(id)
);