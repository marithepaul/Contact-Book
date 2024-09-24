DROP DATABASE IF EXISTS Contact_Book;
CREATE DATABASE Contact_Book;

USE Contact_Book;

CREATE TABLE Contacts (
  contact_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20),
  email VARCHAR(20),
  phone_number VARCHAR(12),
  address VARCHAR(25)
  );

INSERT INTO Contacts (name, email, phone_number, address) VALUES
("Albert Smith", "albertssmith@gmail.com", "325-645-7723", "508 Birch Street, San Diego, CA"),
("Mark Hill", "mark05hill@gmail.com", "662-091-9265", "321 SW Deer Lane, Bismark, ND"),
("Susan Sanchez", "sanchezhotspot@gmail.com", "228-300-144", "1258 North Street, Suite 3, Miami, FL"),
("Margo Anderson", "margoanderson@gmail.com", "750-661-1941", "0005 Rudolf Trail, Des Moines, IA"),
("John Foster", "johnelfoster@gmail.com", "438-435-7285", "999 South Street, Champagne, IL"),
("Karen Jackson", "karenajackson@gmail.com", "159-035-6418", "1450 NE Mass Road, Lincoln, NE"),
("Billy Jenkins", "billy.15.messiah@gmail.com", "350-809-4733", "023 Hell Street, Texarkana, TX"),
("Ben Gates", "benhgates@gmail.com", "128-639-2345", "1080 Apache Trail, Duluth, MN"),
("Rachel Scott", "rachelsscott@gmail.com", "942-504-8277", "1650 Rose Street, Nashville, TN"),
("Michael Henderson", "michaelhson@gmail.com", "852-333-0752", "387 Torch Lane, Pittsburgh, PA");
