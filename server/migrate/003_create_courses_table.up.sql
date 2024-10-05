CREATE TABLE courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  price TEXT,
  author TEXT,
  link TEXT,
  hours_to_complete INTEGER,
  hours_completed INTEGER,
  FOREIGN KEY (user_id) REFERENCES user(id)
);