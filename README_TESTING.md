# Testing

## Table of Contents

---

-   [User Stories](#user-stories)
-   [Manual Testing](#manual-testing)

    -   [Usability testing](#usability-testing)

-   [API Testing](#api-testing)
    -   [Postman](#postman)
-   [Unit Testing](#unit-testing)

---

## [User Stories](#user-stories)

---

-   Search for products.

    -   [x] I would like to see all the products that are available.
    -   [x] I would like to be able to search by category.
    -   [x] I would like to be able to search using a keyword.
            ![Visit deployed website](data/user_stories_1.png)

    -   The site provides the user a side navigation bar where the user can either select all categories or a specific category. The user is also provided with a search bar in the top navigation bar that he/she can use to search by keyword, through the products.

-   Account

    -   [x] I would like to be able to create my own personal account.
            ![Visit deployed website](data/user_stories_2.png)
    -   Users can click on the account icon in the navigation bar to either login or register if they are not already an existing user. The user will also be prompted to login or register to complete the checkout process.

    -   [x] I want to be able you update my account information.
            ![Visit deployed website](data/user_stories_3.png)
    -   Users can update their profile by navigating to their profile page. This icon will show when the user is logged in.
    -   [x] I would like to see my previous order details.

-   Shopping

    -   [x] I would like to see the product price and description.
            ![Visit deployed website](data/user_stories_4.png)
    -   Users can click on any product and they will be redirected the the product page. The user will now be able to view more information on the product and also add it to their wishlist or directly to the cart.
    -   [x] I would like to be notified when I add to cart.
            ![Visit deployed website](data/user_stories_5.png)
    -   When the user adds items to their cart the number of items is updated and displayed in the navigation bar.
    -   [x] I want to be able to review any product on the site.
    -   [x] I want to be able to rate any product on the site.
            ![Visit deployed website](data/user_stories_6.png)
    -   Ueser can leave rating and reviews by using the form on the product page of each product. The user is limited to one review per product.
    -   [x] I would like to be able to checkout easily.
            ![Visit deployed website](data/user_stories_7.png)
    -   On the cart page the user can review all their products, update them or click on the checkout button to begin the check out process.

-   Admin
    -   [x] I would like to be able to add products in bulk.
            ![Visit deployed website](data/user_stories_8.png)
    -   [x] I would like to be able to delete products.
            ![Visit deployed website](data/user_stories_9.png)
            The admin user when logged in, will be able to access the products page. From here the admin user will be able to delete any product.
    -   [x] As the business owner, I would like to have access to an admin section.
            ![Visit deployed website](data/user_stories_10.png)
    -   When an admin user logs in they will have access to the admin panel. From here they will be able to manage users and products.

---

## [Manual Testing](#manual-testing)

---

1. Register

    - Tested the validation on the register form fields. Received the error "Please fill in this field".
    - Tested to register with an incorrect email address format. Received the errors for incorrect email formatting.

2. Login

    - Tested to submit the login form with blank fields. Received the error "Please fill in this field".
    - Tested to submit a form with a user detail that do not exist in the database. Error message warns the user that No active account found with the given credentials.

3. Update user

    - Tested updating the user successfully.
    - Tested the email validation.

4. Upload product

    - Tested the product upload successfully.
    - Intenionally left the fields unvalidated.

5. Delete product

    - Tested the product delete.
    - Product deleted successfully.

6. Update profile

    - Tested the update profile successfully.
    - User receives a success message on successful update.

7. Checkout payment

    - Payment modal provides the user with a green tick on success of payment.

### Usability testing

Useability testing for this website was achieved by sending a live link of the site to a selected group of people and setting them a number of navigation tasks to carry out. Users reported that they could easily accomplish their tasks and navigate seemlessly through the site.

---

## [API testing](#api-testing)

---

### Postman

I used Postman to test API endpoints during the development of this project. I set up a project collection and template URL so that I could regularly test the route responses.

---

## [Unit testing](#unit-testing)

---

Unit testing was carried out on specific parts of the application. Django REST framwork provides test case classes for this task. The test cases use the Django HTTP client to test the API views. For this I needed to import API test case from REST framework. All test can be found in the test.py file in base/tests.py.

    from rest_framework.test import APITestCase

The following tests were carried out:

-   Tested the get product route and response.
-   Tested the get products route and response.
-   Tested the delete product route and response.
-   Tested the update user route and response.
-   Tested the register user route and response.
-   Tested the delete user route and response
