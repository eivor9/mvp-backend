-- db/seed.sql
\c mvp_dev;

INSERT INTO skills (name) VALUES 
('JavaScript'),
('HTML'),
('CSS'),
('SQL'),
('Web Development'),
('Technical Interview Prep'),
('Behavioral Interview Prep');

-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     name TEXT NOT NULL,
--     bio VARCHAR (255) NOT NULL,
--     is_mentor BOOLEAN,
--     job_title TEXT,
--     skills TEXT[],
--     linkedin TEXT,
--     background_color TEXT,
--     email TEXT UNIQUE NOT NULL,
--     password_hash VARCHAR(255) NOT NULL,
--     signup_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );