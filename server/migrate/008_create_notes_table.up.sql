CREATE TABLE notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL, -- Note content
  format TEXT DEFAULT 'text', -- Format of the content (e.g., 'text', 'markdown')
  context_type TEXT, -- E.g., 'task', 'session', 'project'
  context_id INTEGER, -- ID of the associated entity
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

