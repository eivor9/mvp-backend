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