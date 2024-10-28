-- Tasks for User 1 (Linked to Courses)
INSERT INTO tasks (user_id, deadline, context_type, context_id, priority, milestone_id, parent_task_id, is_completed, in_progress, est_hours_to_complete, created_at, updated_at) VALUES
(1, '2024-11-01', 'course', 1, 1, NULL, NULL, FALSE, TRUE, 5, '2024-10-10 09:00:00', '2024-10-15 08:30:00'), -- Working on Chapter 1
(1, '2024-12-01', 'course', 1, 3, 1, NULL, FALSE, FALSE, 10, '2024-10-15 09:30:00', '2024-10-20 10:00:00'), -- Complete Final Assignment
(1, '2024-10-29', 'course', 2, 2, 2, NULL, TRUE, FALSE, 2, '2024-09-28 10:00:00', '2024-10-01 08:30:00'), -- Submit Quiz
(1, '2024-11-05', 'course', 1, 1, 3, 1, FALSE, FALSE, 3, '2024-10-05 11:00:00', '2024-10-05 11:00:00'); -- Sub-task of Chapter 1

-- Tasks for User 2 (Linked to Projects)
INSERT INTO tasks (user_id, deadline, context_type, context_id, priority, milestone_id, parent_task_id, is_completed, in_progress, est_hours_to_complete, created_at, updated_at) VALUES
(2, '2024-10-30', 'project', 2, 2, NULL, NULL, TRUE, FALSE, 6, '2024-09-25 07:00:00', '2024-10-01 07:30:00'), -- Design Homepage
(2, '2024-11-02', 'project', 2, 1, 3, NULL, FALSE, TRUE, 8, '2024-10-15 08:00:00', '2024-10-20 09:00:00'), -- Implement Backend
(2, '2024-12-15', 'project', 3, 2, NULL, NULL, FALSE, FALSE, 4, '2024-10-01 10:00:00', '2024-10-05 10:00:00'), -- Setup CI/CD
(2, '2024-11-10', 'project', 2, 3, NULL, 6, TRUE, FALSE, 1, '2024-10-20 11:00:00', '2024-10-22 12:00:00'); -- Sub-task: Final Touch on Homepage

-- Tasks for User 1 (Personal Tasks)
INSERT INTO tasks (user_id, deadline, context_type, context_id, priority, milestone_id, parent_task_id, is_completed, in_progress, est_hours_to_complete, created_at, updated_at) VALUES
(1, '2024-10-28', 'personal', NULL, 2, NULL, NULL, FALSE, TRUE, 1, '2024-10-20 08:00:00', '2024-10-25 08:00:00'), -- Buy Groceries
(1, '2024-11-15', 'personal', NULL, 1, NULL, NULL, FALSE, FALSE, 2, '2024-10-25 09:00:00', '2024-10-25 09:00:00'); -- Read a Book

