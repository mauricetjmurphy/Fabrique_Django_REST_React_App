import React from "react";
import { Card } from "react-bootstrap";

function ProductCard({ product }) {
    return (
        <Card className="my-3 rounded">
            <a href={`/product/${product.product_id}`}>
                <Card.Img src={product.product_image_url} />
            </a>

            <Card.Body>
                <a href={`/product/${product.product_id}`}>
                    <Card.Title as="div">{product.product_name}</Card.Title>
                    <Card.Text>€ {product.retail_price}</Card.Text>
                </a>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
