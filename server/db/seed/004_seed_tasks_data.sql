DELETE FROM tasks; -- remove all previous values
INSERT INTO tasks (schedule_id, user_id, study_length, study_date, course_id, is_completed)
VALUES 
-- Historical Tasks for the Last 30 Days for User 1
-- August 2024
(1, 1, '01:45:00', '2024-08-26 08:30:00', 1, 1),  -- React study completed
(1, 1, '01:30:00', '2024-08-27 09:00:00', 2, 1),  -- Go study completed
(1, 1, '02:00:00', '2024-08-28 10:00:00', 3, 0),  -- Node.js study not completed
(1, 1, '01:30:00', '2024-08-29 07:30:00', 1, 1),  -- React study completed
(1, 1, '01:15:00', '2024-08-30 11:00:00', 2, 1),  -- Go study completed
(1, 1, '01:00:00', '2024-08-31 08:00:00', 3, 1),  -- Node.js study completed

-- September 2024
(1, 1, '01:40:00', '2024-09-01 09:00:00', 1, 1),  -- React study completed
(1, 1, '02:30:00', '2024-09-02 10:30:00', 2, 1),  -- Go study completed
(1, 1, '01:20:00', '2024-09-03 14:00:00', 3, 1),  -- Node.js study completed
(1, 1, '01:05:00', '2024-09-04 07:30:00', 1, 1),  -- React study completed
(1, 1, '01:50:00', '2024-09-05 10:00:00', 2, 1),  -- Go study completed
(1, 1, '02:00:00', '2024-09-06 11:30:00', 3, 0),  -- Node.js study not completed

(1, 1, '01:55:00', '2024-09-07 08:30:00', 1, 1),  -- React study completed
(1, 1, '02:45:00', '2024-09-08 13:00:00', 2, 0),  -- Go study not completed
(1, 1, '01:00:00', '2024-09-09 15:00:00', 3, 1),  -- Node.js study completed
(1, 1, '01:30:00', '2024-09-10 08:00:00', 1, 1),  -- React study completed
(1, 1, '02:00:00', '2024-09-11 11:00:00', 2, 1),  -- Go study completed
(1, 1, '00:50:00', '2024-09-12 09:00:00', 3, 1),  -- Node.js study completed

(1, 1, '01:20:00', '2024-09-13 10:00:00', 1, 1),  -- React study completed
(1, 1, '01:30:00', '2024-09-14 07:30:00', 2, 1),  -- Go study completed
(1, 1, '02:30:00', '2024-09-15 08:30:00', 3, 0),  -- Node.js study not completed
(1, 1, '01:45:00', '2024-09-16 11:30:00', 1, 1),  -- React study completed
(1, 1, '00:50:00', '2024-09-17 12:00:00', 2, 1),  -- Go study completed
(1, 1, '01:25:00', '2024-09-18 13:00:00', 3, 1),  -- Node.js study completed

(1, 1, '02:00:00', '2024-09-19 14:30:00', 1, 1),  -- React study completed
(1, 1, '01:30:00', '2024-09-20 09:00:00', 2, 1),  -- Go study completed
(1, 1, '01:20:00', '2024-09-21 10:30:00', 3, 0),  -- Node.js study not completed
(1, 1, '00:55:00', '2024-09-22 11:30:00', 1, 1),  -- React study completed
(1, 1, '01:10:00', '2024-09-23 12:30:00', 2, 1),  -- Go study completed
(1, 1, '01:10:00', '2024-09-23 09:30:00', 2, 1),  -- Go study completed
(1, 1, '01:10:00', '2024-09-23 07:30:00', 2, 1),  -- Go study completed
(1, 1, '01:15:00', '2024-09-24 13:00:00', 3, 1),  -- Node.js study completed
(1, 1, '02:30:00', '2024-09-25 08:30:00', 1, 1),  -- React study completed
(1, 1, '01:45:00', '2024-09-25 08:30:00', 1, 1),  -- React study completed
(1, 1, '01:30:00', '2024-09-26 09:00:00', 2, 1),  -- Go study completed
(1, 1, '00:50:00', '2024-09-27 10:00:00', 3, 0),  -- Node.js study not completed
(1, 1, '02:15:00', '2024-09-28 07:30:00', 1, 1),  -- React study completed
(1, 1, '01:00:00', '2024-09-29 11:00:00', 2, 1),  -- Go study completed
(1, 1, '00:45:00', '2024-09-30 12:30:00', 3, 1),  -- Node.js study completed

-- October 2024
(1, 1, '02:00:00', '2024-10-01 09:00:00', 1, 0),  -- React study completed
(1, 1, '01:30:00', '2024-10-02 10:30:00', 2, 0),  -- Go study completed
(1, 1, '01:10:00', '2024-10-03 14:00:00', 3, 0),  -- Node.js study completed
(1, 1, '00:55:00', '2024-10-04 07:30:00', 1, 0),  -- React study completed
(1, 1, '01:50:00', '2024-10-05 10:00:00', 2, 0),  -- Go study completed
(1, 1, '01:20:00', '2024-10-06 11:30:00', 3, 0),  -- Node.js study not completed
(1, 1, '02:30:00', '2024-10-07 13:00:00', 1, 0),  -- React study completed
(1, 1, '00:45:00', '2024-10-08 08:30:00', 2, 0),  -- Go study not completed
(1, 1, '01:00:00', '2024-10-09 15:00:00', 3, 0),  -- Node.js study completed
-- ... Add entries to cover the remaining days

-- Final day of the 60-day period
(1, 1, '01:50:00', '2024-11-25 08:30:00', 2, 1);  -- Go study completed
