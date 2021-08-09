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
    Card,
    Container,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../../actions/cartActions";

const CartPage = ({ match, location, history }) => {
    // Options for the product select values
    const options = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ];

    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split("=")[1]) : 1;

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const checkoutHandler = () => {
        history.push("/login?redirect=shipping");
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <Container style={{ marginTop: "70px", minHeight: "100vh" }}>
            <Row>
                <Col md={8}>
                    <h1 className="mt-5 mb-5">Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <Message variant="info">
                            Your cart is empty{" "}
                            <Link to="/products/">Go Back</Link>
                        </Message>
                    ) : (
                        <ListGroup variant="flush">
                            {cartItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={2}>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fluid
                                                rounded
                                            ></Image>
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.id}`}>
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={2}>{`€ ${item.price}`}</Col>
                                        <Col md={3}>
                                            <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) => {
                                                    dispatch(
                                                        addToCart(
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
                                        <Col>
                                            <Button
                                                type="button"
                                                variant="light"
                                                onClick={() =>
                                                    removeFromCartHandler(
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
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item style={{ background: "#f4f5f7" }}>
                                <h2 className="mt-5 mb-5">
                                    Subtotal (
                                    {cartItems.reduce(
                                        (acc, item) => acc + item.qty,
                                        0
                                    )}
                                    ) items
                                </h2>
                                $
                                {cartItems
                                    .reduce(
                                        (acc, item) =>
                                            acc + item.qty * item.price,
                                        0
                                    )
                                    .toFixed(2)}
                            </ListGroup.Item>

                            <ListGroup.Item style={{ background: "#f4f5f7" }}>
                                <Button
                                    type="button"
                                    className="btn-block btn-dark"
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    Proceed to checkout
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CartPage;
