import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../actions/productActions";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Form } from "react-bootstrap";
import { Preloader } from "../../components/preloader/Preloader";
import Message from "../../components/message/Message";
import Rating from "../../components/rating/Rating";
import "./product-page.css";
import { addToCart } from "../../actions/cartActions";

function ProductPage({ match, history }) {
    // Set the product quantity in the component state
    const [qty, setQty] = useState(1);

    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const { error, loading, product } = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(match.params.id));
    }, []);

    // Options for the product select values
    const options = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ];

    // Using the history prop to redirect us to the cart page, passing in the id and quantity
    const addToCartHandler = () => {
        dispatch(addToCart(match.params.id, qty));
    };

    return (
        <div
            style={{
                height: "800px",
            }}
        >
            <Link to="/products" className="btn btn-light my-3">
                Go Back
            </Link>
            {/* Using a ternary operator to check if the app is loading or if we nned to display an error message */}
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
                                <Form.Control
                                    as="select"
                                    value={qty}
                                    onChange={(e) => {
                                        setQty(e.target.value);
                                    }}
                                >
                                    {options.map((e) => (
                                        <option key={e} label={e} value={e}>
                                            {e}
                                        </option>
                                    ))}
                                </Form.Control>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    className="btn btn-block btn-dark"
                                    type="button"
                                    onClick={addToCartHandler}
                                >
                                    Add to Cart
                                </Button>
                                <Button
                                    className="btn btn-block btn-light"
                                    type="button"
                                    style={{
                                        marginTop: "15px",
                                        border: "1px solid #343a40",
                                    }}
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
