import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./product-card.css";

function ProductCard({ product }) {
    return (
        <Card bsClass="product-card" className="my-3">
            <Link to={`/product/${product.product_id}`}>
                <Card.Img src={product.product_image_url} />
                <Card.Body>
                    <Card.Title
                        bsClass="card-title"
                        className="text-center text-secondary "
                    >
                        {product.product_name}
                    </Card.Title>
                    <Card.Text className="text-center text-secondary">
                        € {product.retail_price}
                    </Card.Text>
                </Card.Body>
            </Link>
        </Card>
    );
}

export default ProductCard;
