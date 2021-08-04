import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./product-card.css";

function ProductCard({ product }) {
    const additionalImage = product.additional_image_link;

    return (
        <Card bsclass="product-card" className="my-3">
            <Link to={`/product/${product.product_id}`}>
                <Card.Img
                    src={product.product_image_url}
                    onMouseOver={(e) => (e.currentTarget.src = additionalImage)}
                    onMouseOut={(e) =>
                        (e.currentTarget.src = product.product_image_url)
                    }
                />
                <Card.Body>
                    <Card.Title
                        bsclass="card-title"
                        className="text-secondary "
                    >
                        {product.product_name}
                    </Card.Title>
                    <Card.Text className="text-secondary">
                        € {product.retail_price}
                    </Card.Text>
                </Card.Body>
            </Link>
        </Card>
    );
}

export default ProductCard;
