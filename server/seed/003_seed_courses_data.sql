INSERT INTO courses (user_id, name, price, author, link, is_completed, in_progress, created_at, updated_at) 
VALUES
(1, 'Introduction to Python', 'Free', 'John Doe', 'https://example.com/python', FALSE, TRUE, '2024-10-12 09:00:00', '2024-10-15 09:00:00'), -- In-progress course
(2, 'React for Beginners', '29.99', 'Jane Doe', 'https://example.com/react', TRUE, FALSE, '2024-09-20 08:00:00', '2024-10-01 08:30:00'), -- Completed course
(1, 'Data Science 101', '49.99', 'John Doe', 'https://example.com/data-science', FALSE, TRUE, '2024-10-01 09:00:00', '2024-10-05 10:00:00'), -- In-progress course
(2, 'Machine Learning Basics', '99.99', 'Jane Smith', 'https://example.com/ml', FALSE, FALSE, '2024-10-15 08:00:00', '2024-10-15 08:00:00'); -- Not started yet

