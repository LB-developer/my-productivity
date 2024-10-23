CREATE TABLE schedule (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT,
  name TEXT,
  FOREIGN KEY (user_id) REFERENCES user(public_id)
);
