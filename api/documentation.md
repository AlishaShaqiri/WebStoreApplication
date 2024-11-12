API Documentation
=================

Overview
--------

This API provides functionalities for managing products, orders, users, discounts, and reports in an e-commerce system. The API allows users to perform CRUD operations on products, place orders, manage user authentication, and generate reports based on sales data.

Base URL
--------

The base URL for all API requests is:

`   http://localhost:5000/api   `

Authentication Routes
---------------------

### POST /auth/login

**Description:** Authenticate a user and return a token.

**Request Body:**

`   {    "username": "user123",    "password": "password"  }   `

**Response:**

`   {    "message": "Login successful",    "token": "jwt_token_here"  }   `

### POST /auth/register

**Description:** Register a new user.

**Request Body:**

`   {    "username": "newUser",    "password": "newPassword",    "email": "newuser@example.com",    "role": "Admin"  }   `

**Response:**

`   {    "message": "Registration successful"  }   `

Product Routes
--------------

### GET /products

**Description:** Retrieve all products.

**Response:**

`   [    {      "id": 1,      "name": "Product 1",      "description": "Product description",      "price": 99.99,      "person": "Men",      "quantity": 100,      "category_id": 1,      "brand_id": 1,      "size_id": 1,      "color_id": 1,      "discount_percentage": 10    },    ...  ]   `

### GET /products/:id

**Description:** Retrieve a product by ID.

**Response:**

`   {    "id": 1,    "name": "Product 1",    "description": "Product description",    "price": 99.99,    "person": "Men",    "quantity": 100,    "category_id": 1,    "brand_id": 1,    "size_id": 1,    "color_id": 1,    "discount_percentage": 10  }   `

### POST /products

**Description:** Add a new product.

**Request Body:**

`   {    "name": "New Product",    "description": "New product description",    "price": 149.99,    "person": "Women",    "quantity": 50,    "category_id": 2,    "brand_id": 3,    "size_id": 2,    "color_id": 4,    "discount_percentage": 15  }   `

**Response:**

`   {    "message": "Product added successfully"  }   `

### PUT /products/:id

**Description:** Update a product by ID.

**Request Body:**

`   {    "name": "Updated Product",    "description": "Updated description",    "price": 129.99,    "quantity": 200  }   `

**Response:**

`   {    "message": "Product updated successfully"  }   `

### DELETE /products/:id

**Description:** Delete a product by ID.

**Response:**

`   {    "message": "Product deleted successfully"  }   `

### GET /products/search

**Description:** Search for products by name or description.

**Request Query:**

`   {    "query": "shirt"  }   `

**Response:**

`   [    {      "id": 3,      "name": "Men's Shirt",      "description": "Cotton shirt",      "price": 29.99,      "quantity": 150    }  ]   `

### GET /products/filters

**Description:** Retrieve available filters for products (e.g., categories, brands, sizes, colors).

**Response:**

`   {    "categories": [1, 2, 3],    "brands": [1, 2],    "sizes": [1, 2, 3],    "colors": [1, 2, 3]  }   `

### Real-Time Quantity Update

**Description:** Real-time update of product quantity when a product's stock is changed. This feature utilizes WebSockets (Socket.IO) to notify connected clients immediately when a product's quantity is updated.

**Real-Time Event:**

*   **Event Name:** productQuantityUpdated
    
*   **Emitted When:** A product's quantity is updated through the API (via a PUT request).
    
*   **Data Sent:**
    
`{    "product_id": 1,    "current_quantity": 150  }   `

**How It Works:**

*   After the backend updates the product quantity, a productQuantityUpdated event is emitted.
    
*   All connected clients listening for this event will automatically update the displayed quantity in real-time without needing to refresh the page.

Order Routes
------------

### POST /orders

**Description:** Create a new order.

**Request Body:**

`   {    "client_id": 1,    "total_amount": 199.99,    "status": "Pending",    "order_items": [      {        "product_id": 1,        "quantity": 2,        "price": 99.99      }    ]  }   `

**Response:**

`   {    "message": "Order created successfully",    "order_id": 1  }   `

### PUT /orders/:id/status

**Description:** Update the status of an order.

**Request Body:**

`   {    "status": "Shipped"  }   `

**Response:**

`   {    "message": "Order status updated successfully"  }   `

Report Routes
-------------

### GET /reports/daily

**Description:** Generate a daily sales report (Admin only).

**Response:**

`   {    "type": "Daily",    "date": "2024-11-12",    "total_sales": 1999.99,    "top_selling_products": "Product 1, Product 2"  }   `

### GET /reports/monthly

**Description:** Generate a monthly sales report (Admin only).

**Response:**

`   {    "type": "Monthly",    "date": "2024-11",    "total_sales": 49999.99,    "top_selling_products": "Product 1, Product 3"  }   `

### GET /reports/top-selling

**Description:** Retrieve the top-selling products (Admin and Advanced User).

**Response:**

`   {    "top_selling_products": [      {        "product_id": 1,        "name": "Product 1",        "total_sales": 1000      },      {        "product_id": 2,        "name": "Product 2",        "total_sales": 800      }    ]  }   `