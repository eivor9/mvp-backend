-- db/seed.sql
\c mvp_dev;

INSERT INTO users (first_name, last_name, email, password, job_title, is_mentee, is_mentor, signup_date) VALUES
('John', 'Doe', 'johndoe@gmail.com', 'password', 'Web Developer', true, false, '2024-01-01'),
('Jane', 'Doe', 'janedoe@gmail.com', 'password', 'Guitar Instructor', false, true, '2024-02-24')
;

INSERT INTO categories (name) VALUES
('Developement'),
('Business'),
('Finance & Accounting'),
('IT & Software'),
('Office Productivity'),
('Personal Development'),
('Design'),
('Marketing'),
('Health & Fitness'),
('Music')
;

INSERT INTO subcategories (category_id, name) VALUES
(1, 'Web Development'), (1, 'Mobile Development'), (1, 'Programming Languages'), (1, 'Game Development'), (1, 'Database Design & Development'), (1, 'Software Testing'),
(2, 'Entrepreneurship'), (2, 'Communication'), (2, 'Management'), (2, 'Sales'), (2, 'Business Strategy'),
(3, 'Accounting & Bookkeping'), (3, 'Cryptocurrency & Blockchain'), (3, 'Finance'), (3, 'Financial Modeling & Analysis'), (3, 'Investing & Trading'),
(4, 'IT Certifications'), (4, 'Network & Security'), (4, 'Hardware'), (4, 'Operating Systems & Servers'), (4, 'Other IT & Software'),
(5, 'Microsoft'), (5, 'Apple'), (5, 'Google'), (5, 'SAP'), (5, 'Oracle'), (5, 'Other Office Productivity'),
(6, 'Personal Transformation'), (6, 'Personal Productivity'), (6, 'Leadership'), (6, 'Career Development'), (6, 'Parenting & Relationships'),
(7, 'Web Design'), (7, 'Graphic Design & Illustration'), (7, 'Design Tools'), (7, 'User Experience Design'), (7, 'Game Design'), (7, '3D & Animation'),
(8, 'Digital Marketing'), (8, 'Search Engine Optimization'), (8, 'Social Media Marketing'), (8, 'Branding'), (8, 'Marketing Fundamentals'), (8, 'Marketing Analytics & Animation'), 
(9, 'Fitness'), (9, 'General Health'), (9, 'Sports'), (9, 'Nutrition & Diet'), (9, 'Yoga'), (9, 'Mental Health'), 
(10, 'Instruments'), (10, 'Music Production'), (10, 'Music Fundamentals'), (10, 'Vocal'), (10, 'Music Techniques'), (10, 'Music Software')
;

INSERT INTO metrics (name, progress) VALUES
('Scales', 100),
('Chords', 50),
('Common Chord Progressions', 0)
;

INSERT INTO connections (mentor_id, mentee_id, category_id, subcategory_id, metric_one, metric_two, metric_three, metric_four, metric_five) VALUES
(2, 1, 10, 51, 1, 2, 3, NULL, NULL)
;

INSERT INTO assignments (name, metric_id, body, target_date, submission_date, is_submitted, submission, rating, connection_id, comment) VALUES
('A Major Scale', 1, 'Play the a major scale at 100 bpm. QUARTER NOTES', '2024-04-20', '2024-04-20', true, 'Scale at target tempo has been acheived', 100, 1, 'Great work!'),
('I - V - VI - IV', 3, 'This progression is one of the most popular and widely used in many genres of music, including rock, pop, and folk. By mastering this progression, you will develop a stronger understanding of basic chord shapes and improve your ability to transition smoothly between chords.', '2024-11-02', NULL, false, NULL, 0, 1, 'No comments yet...'),
('E Major', 2, 'E major chord is widely used across many genres of music. Additionally, learning this chord will improve your ability to form and transition between basic open chords.', '2024-05-02', '2024-05-01', true, 'Worked on the chord. Really getting a handle on open chords as a whole', 100, 1, 'Good job. We''re making great progress'),
('F# Minor', 2, 'The F#m chord is a key chord in many genres, particularly in rock, pop, and indie music. By mastering this chord, you''ll develop the ability to play barre chords, an essential skill for advancing in guitar.',  '2024-11-29', NULL, false, NULL, 0, 1, 'No comments yet...')
;

INSERT INTO conversations (connection_id, mentor_id, mentee_id) VALUES
(1, 2, 1)
;

INSERT INTO messages (body, time_sent, sender_id, recipient_id, conversation_id) VALUES
('Glad to be connected', '2024-03-01 12:00:00', 1, 2, 1),
('Likewise', '2024-03-01 13:00:00', 2, 1, 1)
;

INSERT INTO userCategories (category_id, user_id, is_mentor, is_mentee) VALUES
(10, 2, TRUE, FALSE),
(10, 1, FALSE, TRUE)
;