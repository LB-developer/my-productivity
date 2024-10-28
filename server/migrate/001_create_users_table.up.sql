CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL,
  display_name TEXT NOT NULL,
  email TEXT UNIQUE,
  first_name TEXT,
  last_name TEXT,
  profile_image TEXT,
  location TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
