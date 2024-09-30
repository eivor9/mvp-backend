-- db/seed.sql
\c mvp_dev;

INSERT INTO users (first_name, last_name, email, password, job_title, is_mentee, is_mentor, signup_date) VALUES
('John', 'Doe', 'johndoe@gmail.com', 'password', '', true, false, NULL),
('Jane', 'Doe', 'janedoe@gmail.com', 'password', '', false, true, NULL)
;

INSERT INTO categories (name) VALUES
('Music')
;

INSERT INTO subcategories (category_id, name) VALUES
(1, 'Instruments')
;

INSERT INTO connections (mentor_id, mentee_id, category_id, subcategory_id, metric_one, metric_two, metric_three, metric_four, metric_five) VALUES
(2, 1, 1, 1, 1, NULL, NULL, NULL, NULL)
;

INSERT INTO metrics (name, connection_id, progress) VALUES
('Scales', 1, 0)
;

INSERT INTO assignments (name, body, target_date, is_submitted, submission, rating, connection_id) VALUES
('A Major Scale', 'Play the a major scale at 100 bpm. QUARTER NOTES', NULL, false, NULL, 0, 1)
;

INSERT INTO conversations (connection_id, mentor_id, mentee_id) VALUES
(1, 2, 1)
;

INSERT INTO messages (body, time_sent, sender_id, recipient_id, conversation_id) VALUES
('Glad to be connected', NULL, 1, 2, 1)
;

INSERT INTO userCategories (category_id, user_id, is_mentor, is_mentee) VALUES
(1, 2, TRUE, FALSE),
(1, 1, FALSE, TRUE);


INSERT INTO testimonials (reviewer_id, mentor_id, mentee_id, body, category_id)
VALUES
(1, 2, 1, 'Working with my mentor was a transformative experience. They guided me through web development concepts, helping me build my first full-stack application. Their insights were invaluable!', 1),
(2, 1, 2, 'As a mentee, I had an amazing experience learning about business strategy. My mentor offered practical advice that changed my perspective on management and leadership.', 2),
(1, 2, 1, 'My mentor’s guidance in software testing made all the difference. They helped me improve my testing strategies, leading to more efficient and bug-free code.', 1),
(2, 1, 2, 'The mentorship in management was phenomenal! I gained confidence in my leadership abilities and received practical tips for better team management.', 2),
(1, 2, 1, 'Learning how to optimize databases was a game-changer for my web development projects. My mentor’s advice on best practices helped me improve performance and scalability.', 1);
