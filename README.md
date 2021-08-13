# Fabrique

![Main responsive image](https://res.cloudinary.com/gemtech-solutions/image/upload/v1621965121/The%20Foodie/responsive_k01lld.png)

Fabrique is an ecommerce platform where customers can browse through hundreds of products. Users can login to see their previous orders and manage their account information. The users can also add products to cart and checkout, using stripe payments to purchase the products. Admin staff can log also login and manage all user accounts and products.

[Visit deployed website]()

## Table of Contents

---

- [Fabrique](#fabrique)
  - [Table of Contents](#table-of-contents)
  - [UI/UX](#uiux)
    - [Project goals](#project-goals)
    - [User Stories](#user-stories)
  - [Design](#design)
    - [Color Scheme](#color-scheme)
    - [Typography](#typography)
    - [Images](#images)
    - [Icons](#icons)
  - [Features](#features)
    - [Existing features](#existing-features)
    - [Users login](#users-login)
    - [Registration page](#registration-page)
    - [Future features](#future-features)
  - [Database models and schema](#database-models-and-schema)
    - [Models](#models)
    - [Diagram](#diagram)
  - [Technologies used](#technologies-used)
  - [Deployment](#deployment)
  - [Testing](#testing)
  - [Performance](#performance)
    - [Lazy Loading](#lazy-loading)
  - [Credits](#credits)

---

## UI/UX

---

### Project goals

The goal of this project was to create an application that would allow users to share recipies from accross the world. The app allows the user to create an account, where they can create, read, update and delete their recipe data (CRUD). The app also allows the user to view and leave comments on any recipe uploaded to the site. It provides a platform for all the food lovers out there to share and also try new recipes.

### User Stories

As a user I would like to:

-   User experiance

    -   [x] I would like to access the application from both a desktop and mobile browsers.
    -   [x] I would like smooth and easy navigation of the application to view information.

-   Search for products.

    -   [x] I would like to see all the products that are available
    -   [x] I would like to be able to search by category.
    -   [x] I would like to be able to search using a keyword.

-   Account

    -   [x] I would lik to be able to create my own personal account.
    -   [x] I want to be able you update my account information.
    -   [x] I would like to see my previous order details.

-   Shopping

    -   [x] I would like to see the product price and description.
    -   [x] I would like to be notified when I add to cart.
    -   [x] I want to be able to comment on any product on the site.
    -   [x] I want to be able to rate any product on the site.
    -   [x] I would like to be able to checkout easily.

-   Admin
    -   [x] I would like to be able to edit and add products easily.
    -   [x] I would like to be able to delete products.
    -   [x] As the business owner, I would like to have access to an admin section.

---

## Design

---

### Color Scheme

### Typography

### Images

### Icons

---

## Features

---

### Existing features

### Users login

-   Login form for the user to enter their credentials and login in.
-   Submit button with hover effect.
-   Register link to take the user to the registration page.
-   Form fields are all validated by HTML validatoin.

### Registration page

-   Registration form for te user to sign up and login.
-   Form fields are all validated by flask-WTF extension.
-   The user will have to enter a unique email addess that does not already exist in the database.
-   [x] Users login
    -   Users can
-   [x] Users login
    -   Users can
-   [x] Users login
    -   Users can
-   [x] Users login
    -   Users can
-   [x] Users login
    -   Users can
-   [x] Users login
    -   Users can
-   [x] Users login
    -   Users can
-   [x] Users login
    -   Users can

### Future features

-   [ ] Sort products by price

---

## Database models and schema

---

### Models

-   User
-   Product
-   Order
-   Order Item
-   Shipping Address
-   Review

### Diagram

![Database-diagram](data/database.png)

---

## Technologies used

This ecommerce site was built using the Django REST framework to provide a backend API, to a frontend that uses the React JS framework. The application uses a Postgres database and is hosted on Heroku. The site also uses Amazon AWS S3 buckets to to store the static files and images.

---

-   HTML 5
-   CSS 3
-   jQuery
-   React.js
    -   React bootstrap
    -   React router bootstrap
    -   React Stripe
-   Redux
-   Python 3
-   Django and Django extensions
    -   Django
    -   Django Rest Framework
    -   Django Corsheaders
    -   Django Crispy forms
-   Simple JWT
-   Stripe
-   Google fonts
-   Slick.js
-   Fonts Awesome
-   Git & GitHub
-   Heroku
-   Amazon AWS
-   Adobe suite
-   Cloudinary
-   Google Chrome Developer tools
-   Firefox Developer tools
-   Safari Web Inspector

---

## Deployment

---

---

## Testing

---

The testing information can be located in the following link.

[Testing file](README_TESTING.md)

---

## Performance

---

I user the chrome browsers Lighthouse tool to check performance. There were several areas which needed improvement. These are areas that would require future improvement.

### Lazy Loading

I have use the new html "loading=lazy" attribute throughout the app. The loading attribute specifies whether a browser should load an image immediately or to defer loading of off-screen images until for example the user scrolls near them.

---

## Credits

---
