CREATE TABLE roadmaps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL, 
  description TEXT, 
  start_date DATE, 
  deadline DATE, 
  is_completed BOOLEAN DEFAULT FALSE,
  day_completed DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

