CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  auth0_id TEXT,
  full_name TEXT,
  created_at TEXT, -- date format 
  location TEXT
);