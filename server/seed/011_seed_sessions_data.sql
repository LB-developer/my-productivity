-- Sessions for Task 1 (User 1 - Chapter 1)
INSERT INTO sessions (user_id, task_id, is_ad_hoc, started_at, ended_at, created_at, updated_at) VALUES
(1, 1, FALSE, '2024-10-25 09:00:00', '2024-10-25 10:30:00', '2024-10-20 08:00:00', '2024-10-25 08:30:00'),
(1, 1, FALSE, '2024-10-26 14:00:00', '2024-10-26 15:15:00', '2024-10-20 08:00:00', '2024-10-26 13:30:00');

-- Sessions for Task 6 (User 2 - Implement Backend)
INSERT INTO sessions (user_id, task_id, is_ad_hoc, started_at, ended_at, created_at, updated_at) VALUES
(1, 6, FALSE, '2024-11-02 09:00:00', '2024-11-02 11:30:00', '2024-10-20 08:00:00', '2024-11-01 10:00:00'),
(1, 6, TRUE, '2024-11-03 12:00:00', '2024-11-03 13:45:00', '2024-11-02 08:00:00', '2024-11-02 08:00:00');

-- Sessions for Task 8 (User 2 - Setup CI/CD)
INSERT INTO sessions (user_id, task_id, is_ad_hoc, started_at, ended_at, created_at, updated_at) VALUES
(1, 8, TRUE, '2024-11-04 15:00:00', '2024-11-04 16:00:00', '2024-10-28 08:00:00', '2024-11-01 09:00:00');

-- Ad-hoc Sessions for User 1 (Personal Tasks)
INSERT INTO sessions (user_id, task_id, is_ad_hoc, started_at, ended_at, created_at, updated_at) VALUES
(1, 9, TRUE, '2024-10-28 10:00:00', '2024-10-28 10:30:00', '2024-10-25 07:00:00', '2024-10-25 08:00:00'), -- Groceries
(1, 10, TRUE, '2024-11-15 18:00:00', '2024-11-15 19:00:00', '2024-11-01 09:00:00', '2024-11-01 09:00:00'); -- Read Book

