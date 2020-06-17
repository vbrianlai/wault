CREATE DATABASE waultdb;

CREATE TABLE "user"(
    user_id SERIAL PRIMARY KEY,
    liked_songs JSON,
    user_name VARCHAR(255),
    user_image VARCHAR(255)
);