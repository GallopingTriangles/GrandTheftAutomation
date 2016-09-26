CREATE DATABASE gta;

USE gta;

CREATE TABLE user (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  username TEXT,
  password TEXT,
  email TEXT
);

CREATE TABLE logs (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  level INT
  solution TEXT,
  username_id INT,
  FOREIGN KEY(user_id),
    REFERENCES user(id)
);