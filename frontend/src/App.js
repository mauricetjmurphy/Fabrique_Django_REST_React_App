import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import HomePage from "./pages/home-page/HomePage";
import ProductsPage from "./pages/products-page/ProductsPage";
import ProductPage from "./pages/product-page/ProductPage";

function App() {
    return (
        <Router>
            <Header />
            <main>
                <Container>
                    <Route path="/" component={HomePage} exact />
                    <Route path="/products" component={ProductsPage} />
                    <Route path="/product/:id" component={ProductPage} />
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
