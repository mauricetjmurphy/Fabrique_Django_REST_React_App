import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message/Message";
import {
    Row,
    Col,
    ListGroup,
    Image,
    Form,
    Button,
    Container,
} from "react-bootstrap";
import {
    addToWishlist,
    removeFromWishlist,
    addWishlistToCart,
    removeAllFromWishlist,
} from "../../actions/cartActions";

const WishlistPage = ({ match, location, history }) => {
    // Options for the product select values
    const options = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ];

    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split("=")[1]) : 1;

    const dispatch = useDispatch();

    const wishlist = useSelector((state) => state.wishlist);
    const { wishlistItems } = wishlist;

    useEffect(() => {
        window.scrollTo(0, 0);
        if (productId) {
            dispatch(addToWishlist(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const addToCartHandler = () => {
        dispatch(addWishlistToCart());
        dispatch(removeAllFromWishlist());
        // dispatch(addToCart());
        history.push("/cart");
    };

    const removeFromWishlistHandler = (id) => {
        dispatch(removeFromWishlist(id));
    };

    return (
        <Container style={{ marginTop: "70px", minHeight: "100vh" }}>
            <Row>
                <Col md={12}>
                    <h1 className="justify-content-center mt-5 mb-5 text-center">
                        Wishlist
                    </h1>
                    {wishlistItems.length === 0 ? (
                        <Message variant="info">
                            Your wishlist is empty{" "}
                            <Link
                                style={{ color: "#007bff", marginLeft: "10px" }}
                                to="/products/?category=&page=1"
                            >
                                Shop Now
                            </Link>
                        </Message>
                    ) : (
                        <ListGroup variant="flush">
                            {wishlistItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fluid
                                                rounded
                                            ></Image>
                                        </Col>
                                        <Col md={4}>
                                            <Link
                                                style={{ color: "#000" }}
                                                to={`/product/${item.id}`}
                                            >
                                                {item.name &&
                                                    item.name.split("-")[1]}
                                            </Link>
                                        </Col>
                                        <Col md={2}>{`€ ${item.price}`}</Col>
                                        <Col md={3}>
                                            <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) => {
                                                    dispatch(
                                                        addToWishlist(
                                                            item.id,
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    );
                                                }}
                                            >
                                                {options.map((e) => (
                                                    <option
                                                        key={e}
                                                        label={e}
                                                        value={e}
                                                    >
                                                        {e}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button
                                                type="button"
                                                variant="light"
                                                style={{
                                                    border: "1px solid #343a40",
                                                }}
                                                onClick={() =>
                                                    removeFromWishlistHandler(
                                                        item.id
                                                    )
                                                }
                                            >
                                                <i
                                                    style={{ color: "red" }}
                                                    className="fas fa-trash"
                                                ></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                            <Button
                                variant="dark"
                                style={{ width: "250px", margin: "20px auto" }}
                                onClick={addToCartHandler}
                            >
                                Add to cart
                            </Button>
                        </ListGroup>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default WishlistPage;
