CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT,
    github_link TEXT,
    FOREIGN KEY (user_id) REFERENCES user(id)
);