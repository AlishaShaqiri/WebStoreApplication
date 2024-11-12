

CREATE TABLE Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE Brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE Sizes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    size VARCHAR(10) NOT NULL
);

CREATE TABLE Colors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    person ENUM('Men', 'Women', 'Children'),
    quantity INT DEFAULT 0,
    category_id INT,
    brand_id INT,
    size_id INT,
    color_id INT,
    discount_percentage DECIMAL(5, 2) DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES Categories(id),
    FOREIGN KEY (brand_id) REFERENCES Brands(id),
    FOREIGN KEY (size_id) REFERENCES Sizes(id),
    FOREIGN KEY (color_id) REFERENCES Colors(id)
);

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role ENUM('Admin', 'Advanced User', 'Simple User') NOT NULL
);

CREATE TABLE Clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    address VARCHAR(255),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    total_amount DECIMAL(10, 2),
    status ENUM('Pending', 'Shipped', 'Delivered', 'Cancelled'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES Clients(id)
);

CREATE TABLE Order_Items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE TABLE Discounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    discount_percentage DECIMAL(5, 2),
    valid_from DATE,
    valid_until DATE,
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE TABLE Reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('Daily', 'Monthly'),
    date DATE,
    total_sales DECIMAL(10, 2),
    top_selling_products TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




INSERT INTO Categories (name) 
VALUES ('Clothing'), 
       ('Electronics'), 
       ('Accessories');


INSERT INTO Brands (name) 
VALUES ('Nike'), 
       ('Adidas'), 
       ('Apple'), 
       ('Samsung');


INSERT INTO Sizes (size) 
VALUES ('S'), 
       ('M'), 
       ('L'), 
       ('XL');


INSERT INTO Colors (name) 
VALUES ('Red'), 
       ('Blue'), 
       ('Black'), 
       ('White');


INSERT INTO Products (name, description, price, person, quantity, category_id, brand_id, size_id, color_id, discount_percentage) 
VALUES 
('Nike Running Shoes', 'Comfortable shoes for running', 120.00, 'Men', 50, 1, 1, 2, 1, 10.00),
('Adidas Hoodie', 'Warm hoodie for winter', 60.00, 'Women', 30, 1, 2, 3, 2, 5.00),
('Apple iPhone 15', 'Latest model of iPhone', 999.00, 'Men', 10, 2, 3, NULL, 3, 0.00),
('Samsung Galaxy Watch', 'Smartwatch with health tracking', 250.00, 'Women', 15, 3, 4, NULL, 4, 15.00);


INSERT INTO Users (username, password_hash, email, role) 
VALUES 
('adminy', '$2y$10$bAk930qjNgrsO82Lqry.nuCx/A5GtuGxV.e4B0EtuvVcfQbFajs7q', 'admiyn@example.com', 'Admin')


INSERT INTO Clients (name, email, address, phone) 
VALUES 
('Alice Johnson', 'alice.johnson@example.com', '123 Main St', '555-1234'),
('Bob Smith', 'bob.smith@example.com', '456 Oak Ave', '555-5678');


INSERT INTO Orders (client_id, total_amount, status) 
VALUES 
(1, 180.00, 'Pending'),
(2, 1050.00, 'Shipped');


INSERT INTO Order_Items (order_id, product_id, quantity, price) 
VALUES 
(1, 1, 2, 120.00),
(1, 2, 1, 60.00),
(2, 3, 1, 999.00),
(2, 4, 1, 250.00);


INSERT INTO Discounts (product_id, discount_percentage, valid_from, valid_until) 
VALUES 
(1, 10.00, '2024-01-01', '2024-12-31'),
(2, 5.00, '2024-01-01', '2024-12-31');


INSERT INTO Reports (type, date, total_sales, top_selling_products) 
VALUES 
('Daily', '2024-11-12', 1280.00, 'Nike Running Shoes, Adidas Hoodie'),
('Monthly', '2024-10-31', 5000.00, 'Apple iPhone 15, Samsung Galaxy Watch');
