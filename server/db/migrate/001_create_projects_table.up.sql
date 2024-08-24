CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  technologies TEXT,
  github_link TEXT,
  demo_link TEXT,
  image_url TEXT,
  status TEXT
);