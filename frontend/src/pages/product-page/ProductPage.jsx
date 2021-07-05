import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import axios from "axios";
import Rating from "../../components/rating/Rating";
import "./product-page.css";

function ProductPage({ match }) {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        async function fetchProduct() {
            //Destructuring the awaited response. Await need to be wrapped in an async function
            const { data } = await axios.get(
                `http://localhost:8000/api/products/${match.params.id}`
            );
            setProduct(data);
        }

        fetchProduct();
    }, []);

    return (
        <div
            style={{
                height: "800px",
            }}
        >
            <Link to="/products" className="btn btn-light my-3">
                Go Back
            </Link>
            <Row>
                <Col
                    md={6}
                    style={{
                        height: "650px",
                        overflow: "hidden",
                    }}
                >
                    <Image
                        className="product-img"
                        src={product.product_image_url}
                        alt={product.product_name}
                        fluid
                    ></Image>
                </Col>

                <Col md={6}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>{product.brand}</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h4>{product.product_name}</h4>
                        </ListGroup.Item>

                        <ListGroup.Item>€{product.retail_price}</ListGroup.Item>

                        <ListGroup.Item>Colour: {product.color}</ListGroup.Item>

                        <ListGroup.Item>
                            <Button
                                className="btn btn-block btn-dark"
                                type="button"
                            >
                                Add to Wish List
                            </Button>
                        </ListGroup.Item>

                        <h4 className="pt-3 pl-3 m-0 pb-0">Description</h4>
                        <ListGroup.Item>
                            <p>{product.description}</p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating />
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    );
}

export default ProductPage;
