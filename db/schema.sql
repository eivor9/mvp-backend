-- db/schema.sql

DROP DATABASE IF EXISTS mvp_dev;
CREATE DATABASE mvp_dev;

\c mvp_dev;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS subcategories;
DROP TABLE IF EXISTS connections;
DROP TABLE IF EXISTS metrics;
DROP TABLE IF EXISTS assignments;
DROP TABLE IF EXISTS conversations;
DROP TABLE IF EXISTS messages;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    job_title TEXT,
    is_mentee BOOLEAN,
    is_mentor BOOLEAN,
    signup_date TIMESTAMP
);
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT
);
CREATE TABLE subcategories (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories (id) ON DELETE CASCADE,
    name TEXT
);
CREATE TABLE connections (
    id SERIAL PRIMARY KEY,
    mentor_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
    mentee_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories (id) ON DELETE CASCADE,
    subcategory_id INTEGER REFERENCES subcategories (id) ON DELETE CASCADE,
    metric_one INTEGER,
    metric_two INTEGER,
    metric_three INTEGER,
    metric_four INTEGER,
    metric_five INTEGER
);
CREATE TABLE metrics (
    id SERIAL PRIMARY KEY, 
    name TEXT,
    connection_id INTEGER REFERENCES connections(id) ON DELETE CASCADE,
    progress INTEGER CHECK (progress >= 0 AND progress <= 100)
);
CREATE TABLE assignments (
    id SERIAL PRIMARY KEY, 
    name TEXT,
    body TEXT,
    metric_id INTEGER REFERENCES metrics(id) ON DELETE CASCADE,
    target_date TIMESTAMP,
    is_submitted BOOLEAN,
    submission TEXT,
    rating INTEGER CHECK (rating >= 0 AND rating <= 100),
    connection_id INTEGER REFERENCES connections(id) ON DELETE CASCADE
);
CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    connection_id INTEGER REFERENCES connections(id) ON DELETE CASCADE,
    mentor_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    mentee_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    body TEXT,
    conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
    time_sent TIMESTAMP,
    sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    recipient_id  INTEGER REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE userCategories (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id),
    user_id INTEGER REFERENCES users(id),
    is_mentor BOOLEAN DEFAULT FALSE,
    is_mentee BOOLEAN DEFAULT FALSE,
    UNIQUE (category_id, user_id)
);

