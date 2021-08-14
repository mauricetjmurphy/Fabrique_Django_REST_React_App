import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    Row,
    Col,
    Image,
    ListGroup,
    Button,
    Form,
    Container,
} from "react-bootstrap";

import { Preloader } from "../../components/preloader/Preloader";
import Message from "../../components/message/Message";
import Rating from "../../components/rating/Rating";
import { addToCart, addToWishlist } from "../../actions/cartActions";
import {
    listProductDetails,
    createProductReview,
} from "../../actions/productActions";

import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/productConstants";
import "./product-page.css";

function ProductPage({ match, history }) {
    //----------------Styles---------------//
    const style = {
        border: "none",
    };
    const rowStyle = {
        marginBottom: "50px",
    };
    //------------------------------------//
    const dispatch = useDispatch();

    // Set the product quantity in the component state
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const productDetails = useSelector((state) => state.productDetails);
    const { error, loading, product } = productDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productReviewCreate = useSelector(
        (state) => state.productReviewCreate
    );
    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview,
    } = productReviewCreate;

    useEffect(() => {
        window.scrollTo(0, 0);
        if (successProductReview) {
            setRating(0);
            setComment("");
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match, successProductReview]);

    // Options for the product select values
    const options = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ];

    // Using the history prop to redirect us to the cart page, passing in the id and quantity
    const addToCartHandler = () => {
        dispatch(addToCart(match.params.id, qty));
    };

    const addToWishlistHandler = () => {
        dispatch(addToWishlist(match.params.id, qty));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            createProductReview(match.params.id, {
                rating,
                comment,
            })
        );
        dispatch(listProductDetails(match.params.id));
    };

    return (
        <Container style={{ marginTop: "70px", minHeight: "100vh" }}>
            <Link
                to="/products/?category=&page=1"
                className="btn btn-light my-3"
            >
                Go Back
            </Link>
            {/* Using a ternary operator to check if the app is loading or if we nned to display an error message */}
            {loading ? (
                <Preloader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div>
                    <Row style={rowStyle}>
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
                            <ListGroup>
                                <ListGroup.Item style={style}>
                                    <h3
                                        style={{
                                            fontSize: "20px",
                                            letterSpacing: "1px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {product.brand}
                                    </h3>
                                </ListGroup.Item>

                                <ListGroup.Item style={style}>
                                    <h4
                                        style={{
                                            fontSize: "18px",
                                            letterSpacing: "1px",
                                        }}
                                    >
                                        {product.product_name &&
                                            product.product_name.split("-")[1]}
                                    </h4>
                                </ListGroup.Item>

                                <ListGroup.Item style={style}>
                                    <p
                                        style={{
                                            fontSize: "16px",
                                            letterSpacing: "1px",
                                        }}
                                    >
                                        €{product.retail_price}
                                    </p>
                                </ListGroup.Item>

                                <ListGroup.Item
                                    style={{ fontSize: "14px", border: "none" }}
                                >
                                    Colour: {product.color}
                                </ListGroup.Item>

                                <ListGroup.Item style={style}>
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

                                <ListGroup.Item style={style}>
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
                                        onClick={addToWishlistHandler}
                                    >
                                        Add to Wishlist
                                    </Button>
                                </ListGroup.Item>

                                <ListGroup.Item style={style}>
                                    <Rating
                                        value={product.rating}
                                        color="#f8e825"
                                    />
                                    <p>
                                        {product.numReviews}{" "}
                                        {`${
                                            product.numReviews <= 1
                                                ? "Review"
                                                : "Reviews"
                                        }
                                        `}
                                    </p>
                                </ListGroup.Item>

                                <ListGroup.Item style={style}>
                                    <h4
                                        style={{
                                            fontSize: "18px",
                                            letterSpacing: "1px",
                                        }}
                                        className="pt-3 pb-3 m-0"
                                    >
                                        Description
                                    </h4>
                                    <p
                                        style={{
                                            fontSize: "13px",
                                        }}
                                    >
                                        {product.description}
                                    </p>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <ListGroup variant="flush">
                                <ListGroup.Item style={{ padding: "0" }}>
                                    <h4>Write a review</h4>

                                    {loadingProductReview && <Preloader />}
                                    {successProductReview && (
                                        <Message variant="success">
                                            Review Submitted
                                        </Message>
                                    )}
                                    {errorProductReview && (
                                        <Message variant="danger">
                                            {errorProductReview}
                                        </Message>
                                    )}

                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId="rating">
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={rating}
                                                    onChange={(e) =>
                                                        setRating(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="select rating"></option>
                                                    <option value="1">
                                                        1 - Poor
                                                    </option>
                                                    <option value="2">
                                                        2 - Ok
                                                    </option>
                                                    <option value="3">
                                                        3 - Goog
                                                    </option>
                                                    <option value="4">
                                                        4 - Ver good
                                                    </option>
                                                    <option value="5">
                                                        5 - Excellent
                                                    </option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="comment">
                                                <Form.Label>Review</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    row="5"
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }
                                                ></Form.Control>
                                            </Form.Group>

                                            <Button
                                                disabled={loadingProductReview}
                                                type="submit"
                                                className="btn-dark btn-block mb-5"
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message variant="info">
                                            Plaes login{" "}
                                            <Link to="/login">Login</Link> to
                                            write a review
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={6}>
                            {product.reviews.length === 0 && (
                                <Message variant="info">No Reviews</Message>
                            )}
                            <ListGroup variant="flush">
                                <ListGroup.Item style={style}>
                                    <h4>Reviews</h4>
                                </ListGroup.Item>

                                {product.reviews.map((review, index) => (
                                    <ListGroup.Item key={index}>
                                        <strong>{review.name}</strong>
                                        <Rating
                                            value={review.rating}
                                            color="#f8e825"
                                        />
                                        <p>
                                            {review.createdAt.substring(0, 10)}
                                        </p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                </div>
            )}
        </Container>
    );
}

export default ProductPage;
