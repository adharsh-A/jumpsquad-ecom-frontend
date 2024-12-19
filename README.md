# Project Name
E-commerce Application
======================

## Description
This is an e-commerce application built using React, JavaScript, and various other technologies. The application allows users to browse and purchase products, manage their cart and wishlist, and interact with the application through a user-friendly interface.

## Features
### 1. Product Management
* Display products in a grid or list view
* Filter products by category, price, and rating
* Search products by name or description
* View product details, including description, price, and reviews

### 2. Cart and Wishlist Management
* Add products to cart or wishlist
* View cart and wishlist contents
* Update cart and wishlist quantities
* Remove products from cart and wishlist

### 3. User Authentication
* User registration and login functionality
* Password reset and recovery
* User profile management

### 4. Payment Gateway Integration
* Integrate with payment gateways for secure transactions
* Support for multiple payment methods

### 5. Order Management
* View order history and status
* Cancel or return orders
* Track order shipping and delivery

### 6. Admin Dashboard
* Manage products, orders, and users
* View sales reports and analytics
* Configure application settings

## Technologies Used
* React
* JavaScript
* HTML/CSS
* Tailwind CSS
* React Toastify
* Axios
* Auth Context API

## Components
* `ProductCard`: displays product information and allows users to add to cart or wishlist
* `ProductList`: displays a list of products
* `Cart`: displays cart contents and allows users to update quantities or remove products
* `Wishlist`: displays wishlist contents and allows users to update quantities or remove products
* `Dialog`: a reusable dialog component for displaying alerts and confirmations
* `Drawer`: a reusable drawer component for displaying navigation and other content

## Contexts
* `AuthContext`: manages user authentication state and provides authentication-related functionality
* `CartContext`: manages cart state and provides cart-related functionality
* `WishlistContext`: manages wishlist state and provides wishlist-related functionality

## APIs
* `axios`: used for making API requests to the server

## Models
* `Product`: represents a product with attributes such as name, description, price, and rating
* `Order`: represents an order with attributes such as products, quantity, and status
* `User`: represents a user with attributes such as name, email, and password

## Configuration
* `tailwind.config.js`: configuration file for Tailwind CSS

## Installation
To install the application, run the following command:
```bash
npm install
```
## Usage
To start the application, run the following command:
```bash
npm start
```
