import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import Rating from "../../components/rating/Rating";
import products from "../../products";

function ProductPage({ match }) {
    const product = products.find((p) => p.product_id == match.params.id);
    return (
        <div>
            <h1>{product.product_name}</h1>
        </div>
    );
}

export default ProductPage;
