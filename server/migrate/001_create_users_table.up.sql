CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT,
  uid TEXT,
  display_name TEXT,
  created_at TEXT -- date format 
);
