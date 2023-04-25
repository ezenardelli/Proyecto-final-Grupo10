CREATE DATABASE dhtravel;
USE dhtravel;

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(45) NOT NULL,
  lastName VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  category VARCHAR(45) NOT NULL,
  password VARCHAR(100),
  image VARCHAR(100) NOT NULL
);

CREATE TABLE payment (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(45) NOT NULL,
  credit_number TINYINT(16) NOT NULL,
  expire TINYINT(4) NOT NULL,
  cvv TINYINT(5) NOT NULL,
  id_card TINYINT(15) NOT NULL
);

CREATE TABLE category (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(45) NOT NULL
);

CREATE TABLE product (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
  image VARCHAR(100) NOT NULL, 
  description VARCHAR(200) NOT NULL, 
  origin VARCHAR(45) NOT NULL, 
  destination VARCHAR(45) NOT NULL, 
  person VARCHAR(45) NOT NULL, 
  date DATE,
  price DECIMAL(10, 2),
  category_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE order_list (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  payment_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (payment_id) REFERENCES payment(id)
);

CREATE TABLE order_product (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  order_product_id INT NOT NULL,
  product_order_id INT NOT NULL,
  FOREIGN KEY (order_product_id) REFERENCES order_list(id),
  FOREIGN KEY (product_order_id) REFERENCES product(id)
);