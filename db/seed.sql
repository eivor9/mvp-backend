-- db/seed.sql
\c mvp_dev;

INSERT INTO users (name, bio, is_mentor, job_title, skills, linkedin, background_color, email, password_hash) VALUES (
    'Nasheed Jeremiah', 
    'I"m an aspiring web developer with a passion for crafting engaging and user-friendly web applications. Currently honing my skills in HTML, CSS, and JavaScript, I am eager to dive deeper into front-end development and responsive design. I thrive in collaborative environments and believe that effective communication and teamwork are essential to creating successful projects. As I learn and grow in this field, I enjoy participating in coding communities and contributing to open-source initiatives. My goal is to build innovative digital experiences that connect people and enhance their online interactions.',
    FALSE,
    NULL,
    NULL,
    'https://www.linkedin.com/in/nasheedjeremiah/',
    NULL,
    'test@email.com',
    '$2b$10$T9WwJSGUniwL717W5SDz8u0BAzNQKEL.u4AwE/w1rP8.whDIjz1eC'
);

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