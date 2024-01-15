
DROP DATABASE IF EXISTS budgetor_db;
CREATE DATABASE budgetor_db;

USE budgetor_db;

SELECT DATABASE();

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Savings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255),
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    goal DECIMAL(10, 2),  -- Optional field for setting a savings goal
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);


CREATE TABLE Income (
    id INT AUTO_INCREMENT PRIMARY KEY,
    source VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
