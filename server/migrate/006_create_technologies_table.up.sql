CREATE TABLE technologies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  context_id INTEGER NOT NULL, -- 'project.id' , 'course.id', etc..
  context_type TEXT NOT NULL, -- 'project', 'course', etc...
  name TEXT NOT NULL,
  image_link TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

