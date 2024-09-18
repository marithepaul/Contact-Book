DROP DATABASE IF EXISTS Contact_Book;
CREATE DATABASE Contact_Book;

USE Contact_Book;

CREATE TABLE Contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20),
  email VARCHAR(20),
  phone_number VARCHAR(12),
  address VARCHAR(25)
  );
