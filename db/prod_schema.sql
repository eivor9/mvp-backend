DROP DATABASE IF EXISTS mvp_dev;
CREATE DATABASE mvp_dev;

\c mvp_dev;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS subcategories;
DROP TABLE IF EXISTS connections;
DROP TABLE IF EXISTS assignments;
DROP TABLE IF EXISTS conversations;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS metrics;

CREATE TABLE users (

);
CREATE TABLE categories (

);
CREATE TABLE subcategories (

);
CREATE TABLE connections (

);
CREATE TABLE assignments (
    id SERIAL PRIMARY KEY, 
    name TEXT,
    body TEXT,
    target_date TIMESTAMP,
    is_submitted BOOLEAN,
    submission TEXT,
    rating INTEGER CHECK (rating >= 0 AND rating <= 100),
    FOREIGN KEY (connection_id) REFERENCES connections(id) ON DELETE CASCADE
);
CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    FOREIGN KEY (connection_id) REFERENCES connections(id) ON DELETE CASCADE,
    FOREIGN KEY (mentor_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (mentee_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    time_sent TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE metrics (
    id SERIAL PRIMARY KEY, 
    name TEXT,
    FOREIGN KEY (connection_id) REFERENCES connections(id) ON DELETE CASCADE,
    progress INTEGER CHECK (rating >= 0 AND rating <= 100)
);

