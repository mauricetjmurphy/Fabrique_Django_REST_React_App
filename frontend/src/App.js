import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import HomePage from "./pages/home-page/HomePage";
import LoginPage from "./pages/login-page/LoginPage";
import RegisterPage from "./pages/register-page/RegisterPage";
import ProductsPage from "./pages/products-page/ProductsPage";
import ProductPage from "./pages/product-page/ProductPage";
import CartPage from "./pages/cart-page/CartPage";

function App() {
    return (
        <Router id="root">
            <Navbar />
            <main className="mb-2">
                <Container>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/" component={HomePage} exact />
                    <Route path="/products" component={ProductsPage} />
                    <Route path="/product/:id" component={ProductPage} />
                    {/* The ? in the url make the id parameter optional */}
                    <Route path="/cart/:id?" component={CartPage} />
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
