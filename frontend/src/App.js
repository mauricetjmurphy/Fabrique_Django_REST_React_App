import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

import NavigationBar from "./components/navbar/NavigationBar";
import Sidemenu from "./components/sidemenu/Sidemenu";
import Footer from "./components/footer/Footer";

import HomePage from "./pages/home-page/HomePage";
import LoginPage from "./pages/login-page/LoginPage";
import RegisterPage from "./pages/register-page/RegisterPage";
import ProductsPage from "./pages/products-page/ProductsPage";
import ProductPage from "./pages/product-page/ProductPage";
import CartPage from "./pages/cart-page/CartPage";
import ProfilePage from "./pages/profile-page/ProfilePage";
import ShippingPage from "./pages/shipping-page/ShippingPage";
import PaymentPage from "./pages/payment-page/PaymentPage";
import PlaceOrderPage from "./pages/place-order-page/PlaceOrderPage";
import OrderPage from "./pages/order-page/OrderPage";
import UserListPage from "./pages/user-list-page/UserListPage";

function App() {
    return (
        <Router className="App" id="root">
            <NavigationBar />
            <Sidemenu />

            <Container>
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/" component={HomePage} exact />
                <Route path="/products" component={ProductsPage} />
                <Route path="/product/:id" component={ProductPage} />
                {/* The ? in the url make the id parameter optional */}
                <Route path="/cart/:id?" component={CartPage} />
                <Route path="/shipping/" component={ShippingPage} />
                <Route path="/payment/" component={PaymentPage} />
                <Route path="/place-order/" component={PlaceOrderPage} />
                <Route path="/order/:id" component={OrderPage} />

                <Route path="/admin/user-list/" component={UserListPage} />
            </Container>

            <Footer />
        </Router>
    );
}

export default App;
