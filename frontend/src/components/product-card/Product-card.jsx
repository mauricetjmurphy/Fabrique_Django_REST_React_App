import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
    return (
        <Card className="my-3 rounded">
            <Link to={`/product/${product.product_id}`}>
                <Card.Img src={product.product_image_url} />
                <Card.Body>
                    <Card.Title as="div">{product.product_name}</Card.Title>
                    <Card.Text>€ {product.retail_price}</Card.Text>
                </Card.Body>
            </Link>
        </Card>
    );
}

export default ProductCard;
