-- tasks_up.sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL, -- Linked to users.id
  name TEXT NOT NULL,
  deadline DATE NOT NULL, -- Task deadline
  context_type TEXT NOT NULL, -- E.g., 'course', 'project'
  context_id INTEGER, -- ID of the associated entity or null when ad hoc
  priority INTEGER DEFAULT 0, -- Task priority (higher = more urgent)
  milestone_id INTEGER, -- Optional link to milestones.id
  parent_task_id INTEGER, -- Optional self-reference for sub-tasks
  is_completed BOOLEAN DEFAULT FALSE, -- Whether the task is complete
  in_progress BOOLEAN DEFAULT FALSE, -- Whether the task is in progress
  est_hours_to_complete INTEGER, -- Estimated time to complete
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (milestone_id) REFERENCES milestones(id) ON DELETE SET NULL,
  FOREIGN KEY (parent_task_id) REFERENCES tasks(id) ON DELETE SET NULL
);

