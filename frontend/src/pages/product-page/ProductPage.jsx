import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../actions/productActions";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import { Preloader } from "../../components/PreLoader/Preloader";
import { Message } from "../../components/Message/Message";
import Rating from "../../components/rating/Rating";
import "./product-page.css";

function ProductPage({ match }) {
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const { error, loading, product } = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(match.params.id));
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
            {loading ? (
                <Preloader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
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

                            <ListGroup.Item>
                                €{product.retail_price}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Colour: {product.color}
                            </ListGroup.Item>

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
            )}
        </div>
    );
}

export default ProductPage;
