DROP DATABASE IF EXISTS mvp_dev;
CREATE DATABASE mvp_dev;


\c mvp_dev;


DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS connections;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS metrics;
DROP TABLE IF EXISTS assignments;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    bio TEXT,
    is_mentor BOOLEAN,
    job_title TEXT,
    skills TEXT[],
    linkedin TEXT,
    background_color TEXT DEFAULT 'linear-gradient(0deg,rgba(177,177,177,0.9)0%,rgba(180,180,180,0.4)100%)',
    email TEXT UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    signup_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE connections (
    id SERIAL PRIMARY KEY,
    mentor_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
    mentee_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
    skill_id INTEGER REFERENCES skills (id) ON DELETE CASCADE,
    zoom TEXT,
    status TEXT DEFAULT 'pending'
);


CREATE TABLE metrics (
    id SERIAL PRIMARY KEY,
    name TEXT,
    skill_id INTEGER REFERENCES skills (ID) ON DELETE CASCADE,
    progress INTEGER CHECK (progress >= 0 AND progress <= 100),
    connection_id INTEGER REFERENCES connections(id) ON DELETE CASCADE
);

CREATE TABLE assignments (
    id SERIAL PRIMARY KEY, 
    name TEXT,
    body TEXT,
    metric_id INTEGER REFERENCES metrics(id) ON DELETE CASCADE,
    due_date DATE,
    is_completed BOOLEAN,
    connection_id INTEGER REFERENCES connections(id) ON DELETE CASCADE
);

CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    connection_id INTEGER REFERENCES connections(id) ON DELETE CASCADE,
    sender_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    recipient_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    message_text TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'unread'
);
