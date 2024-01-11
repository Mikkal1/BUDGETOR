-- Database setup
DROP DATABASE IF EXISTS budgetor_db;
CREATE DATABASE budgetor_db;

USE budgetor_db;

SELECT DATABASE();
-- Creates a Users table
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creates a Categories table
CREATE TABLE Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Creates an Expenses table
CREATE TABLE Expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255),
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    category_id INT,
    user_id INT,
    FOREIGN KEY (category_id) REFERENCES Categories(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Creates an Incomes table
CREATE TABLE Incomes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    source VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
