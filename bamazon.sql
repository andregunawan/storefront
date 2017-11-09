CREATE DATABASE Bamazon; 

USE bamazon;

CREATE TABLE Products (
item_id int NOT NULL,
product_name varchar(50) NOT NULL,
department_name varchar(50) NOT NULL,
price DECIMAL(4,2) NOT NULL,
stock_quantity int NOT NULL); 

INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES (
11789,
'Lightning Cable',
'Electronics',
4.99,
50);

INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES (
11975,
'iPhone X Case',
'Electronics',
36.79,
25);

INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES (
23157,
'Trash Bin',
'Kitchen',
14.50,
36);

INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES (
23273,
'Kitchen Knife Set',
'Kitchen',
60.85,
45);

INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES (
34980,
'Scotch Tape',
'Office',
10.50,
50);

INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES (
34337,
'Printer Ink',
'Office',
32.56,
30);

INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES (
47723,
'Mattress',
'Home',
89.99,
21);

INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES (
46821,
'Side Table',
'Home',
39.99,
73);

INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES (
51003,
'PS4 Controller',
'Games',
45.99,
55);

INSERT INTO Products (item_id, product_name, department_name, price, stock_quantity) VALUES (
51003,
'PS4 Arkham Knight',
'Games',
39.99,
17);

