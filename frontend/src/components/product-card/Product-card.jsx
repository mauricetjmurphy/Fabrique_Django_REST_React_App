import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./product-card.css";

function ProductCard({ product }) {
    const [additionalImage, setAdditionalImage] = useState();
    // const additionalImage = product.additional_image_link.split(",")[1];

    useEffect(() => {
        setAdditionalImage(product.additional_image_link.split(",")[1]);
    }, [product]);

    return (
        <Card
            style={{ margin: "0 auto" }}
            bsclass="product-card"
            className="my-3"
        >
            <Link to={`/product/${product.product_id}`}>
                <Card.Img
                    className="fade-img-in"
                    src={product.product_image_url}
                    onMouseOver={(e) => (e.currentTarget.src = additionalImage)}
                    onMouseOut={(e) =>
                        (e.currentTarget.src = product.product_image_url)
                    }
                    loading="lazy"
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
