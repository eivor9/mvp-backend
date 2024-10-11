DROP DATABASE IF EXISTS mvp_dev;
CREATE DATABASE mvp_dev;


\c mvp_dev;


DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS conversations;
DROP TABLE IF EXISTS assignments;
DROP TABLE IF EXISTS metrics;
DROP TABLE IF EXISTS connections;
DROP TABLE IF EXISTS userSubcategories;
DROP TABLE IF EXISTS userCategories;
DROP TABLE IF EXISTS subcategories;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS testimonials;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    job_title TEXT,
    is_mentee BOOLEAN,
    is_mentor BOOLEAN,
    signup_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    bio TEXT,
    goals TEXT
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
    status TEXT DEFAULT 'pending'
);

CREATE TABLE metrics (
    id SERIAL PRIMARY KEY,
    name TEXT,
    progress INTEGER CHECK (progress >= 0 AND progress <= 100),
    connection_id INTEGER REFERENCES connections(id) ON DELETE CASCADE
);

CREATE TABLE assignments (
    id SERIAL PRIMARY KEY, 
    name TEXT,
    body TEXT,
    metric_id INTEGER REFERENCES metrics(id) ON DELETE CASCADE,
    target_date DATE,
    submission_date DATE,
    is_submitted BOOLEAN,
    submission TEXT,
    rating INTEGER CHECK (rating >= 0 AND rating <= 100),
    connection_id INTEGER REFERENCES connections(id) ON DELETE CASCADE,
    comment TEXT
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
    recipient_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE userCategories (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id),
    user_id INTEGER REFERENCES users(id),
    is_mentor BOOLEAN DEFAULT FALSE,
    is_mentee BOOLEAN DEFAULT FALSE,
    UNIQUE (category_id, user_id)
);

CREATE TABLE userSubcategories (
    id SERIAL PRIMARY KEY,
    subcategory_id INTEGER REFERENCES subcategories(id),
    user_id INTEGER REFERENCES users(id),
    is_mentor BOOLEAN DEFAULT FALSE,
    is_mentee BOOLEAN DEFAULT FALSE,
    UNIQUE (subcategory_id, user_id)
);

CREATE TABLE testimonials (
    id SERIAL PRIMARY KEY,
    reviewer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    mentor_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    mentee_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    body TEXT NOT NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_links (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    link TEXT NOT NULL
);
