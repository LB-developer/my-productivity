INSERT INTO milestones (deadline, is_completed, in_progress, parent_roadmap, created_at, updated_at) VALUES
('2024-02-15', FALSE, TRUE, 1, '2024-01-01 08:00:00', '2024-01-10 09:00:00'), -- First milestone in progress
('2024-04-01', TRUE, FALSE, 2, '2024-02-01 09:00:00', '2024-04-01 12:00:00'), -- Completed milestone
('2024-05-01', FALSE, TRUE, 1, '2024-03-01 10:00:00', '2024-03-10 11:00:00'); -- Upcoming milestone

