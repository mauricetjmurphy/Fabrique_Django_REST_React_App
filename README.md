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
      - [Navigation](#navigation)
      - [Users login](#users-login)
      - [Registration page](#registration-page)
      - [Homepage](#homepage)
      - [Products Page](#products-page)
      - [Admin Panel](#admin-panel)
      - [User Panel](#user-panel)
      - [Wishlist](#wishlist)
      - [Cart](#cart)
      - [Product Reviews](#product-reviews)
    - [Future features](#future-features)
  - [Database models and schema](#database-models-and-schema)
    - [Models](#models)
    - [Diagram](#diagram)
  - [Technologies used](#technologies-used)
  - [Deployment](#deployment)
    - [React Deployment](#react-deployment)
  - [Testing](#testing)
  - [Performance](#performance)
    - [Lazy Loading](#lazy-loading)
  - [Credits](#credits)

---

## UI/UX

---

### Project goals

The goal of this project was to create an application that would allow users shop for their favourite fashion products. The app allows the user to login or create an account. When the user is logged in they can update their personal details and view past orders. The site also allows the user to view and leave ratings and reviews on any product available on the site. It provides a platform for all the fashion lovers out there to shop until they drop.

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

-   I have chosen the Goeria font style.
-   The font was downloaded and then imported into my index.css file.
-   Different fone sizes and weights have been used throughout the project.

### Images

-   All images in the project have been obtained from Pexels.com or Unsplash.com. Images have been resized as required.

### Icons

-   Several icons have been used in this project for the navigation and the social media links in the footer. All icons have been obtained from Font Awsome.

---

## Features

---

### Existing features

#### Navigation

-   Top navigition bar
    -   This navigation bar provides links to all the pages listed below.
    -   It also contains a search bar that can be used to search the products by keyword.
-   Side navigation bar
    -   The side navigation bar provides links to the product categories.
    -   By clicking on these links, the user will be redirected to the products page. The selected product category will be displayed.

#### Users login

-   Login form for the user to enter their credentials and login in.
-   Submit button with hover effect.
-   Register link to take the user to the registration page.
-   Form fields are all validated by HTML validatoin.

#### Registration page

-   Registration form for the user to sign up and login.
-   Form fields are all validated by HTML validation.
-   The user will have to enter a unique email addess that does not already exist in the database.

#### Homepage

-   Navigation bar with links to each page.
-   React slide show hero component that shows several fashion images.
-   Categories section where each recipe is categorised into specific meals
-   Clickable link images that filter the products by category and display them on the products page.

#### Products Page

-   Products are display in cards to the user.
-   Each card is a clickable link to the product page.
-   The product page displays skeleton loading cards before the response data from the API call is returned.

#### Admin Panel

-   Users page
    -   The users page displays a list of the current users.
    -   Users can be edited and deleted by the admin user.
-   Products page
    -   The products page provides the user with a form to add new products.
    -   The page also lists all the existing products and gives the admin user the option to delete any product.

#### User Panel

-   Profile page
    -   The profile page is available to any logged in user.
    -   The page provide the user with a form for updating their personal details.
    -   The page also displays the users previous orders.
-   Logout

    -   The logout link will logout the current user

#### Wishlist

-   The wishlist page stores any products that the user want to hold before starting the checkout process.
-   The user is provided with a button for sending the products to the cart whenever he/she is ready to checkout.

#### Cart

-   The cart pages holds all the products that the user has added.
-   The user can update the product quantiy or delete products from the cart at anytime.
-   The user is provided with a button to proceed to checkout.

#### Product Reviews

-   The user can rate and leave product reviews for other users to see.
-   The user is limited to one review per product.

### Future features

-   [ ] Sort products by price

---

## Database models and schema

---

The database used for this Project was Postgres, as an Installed add-on to the deployed Heroku Application. Sqlite3 was used initially to test the sites performance on a smaller dataset. Mid-development I moved to local & deployed testing so Postgres was used from that point on.

When each app and its models were created and implemented, python manage.py makemigrations was run in the terminal to create the initial model package and python manage.py migrate was then used to apply the model to the database and create the table.

Where possible, first-time-right methodology was approached when creating the models to avoid to many alterations to the models and the database table through multiple makemigrations and migrate commands.

### Models

-   User
    -   This model came from the django.contrib.auth model class. It provided all the inbuilt User object fields.
-   ## Product
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
    -   Thunk middleware
-   Python 3
-   Django and Django extensions
    -   Django
    -   Django Rest Framework
    -   Django Corsheaders
    -   Django Crispy forms
-   Simple JWT
-   Stripe
-   Google fonts
-   Fonts Awesome
-   Git & GitHub
-   Heroku
-   Amazon AWS
-   Adobe suite
-   Google Chrome Developer tools
-   Firefox Developer tools
-   Safari Web Inspector
-   Postman API testing

---

## Deployment

---

---

### React Deployment

In preparation for deployment I have to bundle my react files into static assets. Npm run build created a build directory with a production build of my app. I set up my HTTP server so that a visitor to the site is served index.html, and requests to static paths like /static/js/main.<hash>.js are served with the contents of the /static/js/main.<hash>.js file.

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
