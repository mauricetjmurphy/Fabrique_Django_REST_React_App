import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import Rating from "../../components/rating/Rating";
import products from "../../products";
import "./product-page.css";

function ProductPage({ match }) {
    // Find the product in the products array, that has the same id as the one passed in  as url parameter
    const product = products.find((p) => p.product_id == match.params.id);
    return (
        <div>
            <Link to="/" className="btn btn-light my-3">
                Go Back
            </Link>
            <Row>
                <Col md={6}>
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
