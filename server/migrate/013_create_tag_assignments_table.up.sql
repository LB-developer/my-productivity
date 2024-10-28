CREATE TABLE tag_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tag_id INTEGER NOT NULL, -- Linked to tags.id
  context_type TEXT NOT NULL, -- Context (e.g., 'task', 'course', etc.)
  context_id INTEGER NOT NULL, -- ID of the specific entity
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

