import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
    Button,
    Row,
    Col,
    Image,
    Card,
    ListGroup,
    Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutProcess from "../../components/checkout-process/CheckoutProcess";
import Message from "../../components/message/Message";
import { createOrder } from "../../actions/orderActions";
import { ORDER_CREATE_RESET } from "../../constants/orderConstants";
import StripeCheckout from "react-stripe-checkout";

function PlaceOrderPage() {
    const btnStyle = {
        width: "100%",
    };

    const publishableKey =
        "pk_test_51Hm0EzJ5jSqIz8UnqxlXMtTomLDcQPEss7hsbxdIMEAOeiM59FIsNLvrYvgdtJfMY2ZsVWr1TW0HSva7VLK3INwd00E5u3MgTK";

    let history = useHistory();
    const orderCreate = useSelector((state) => state.orderCreate);
    const { error, success } = orderCreate;

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    // Setting an attribute in the the cart object. It will only be available to this page.
    cart.itemsPrice = cart.cartItems
        .reduce((acc, item) => acc + item.price * item.qty, 0)
        .toFixed(2);

    console.log(cart);

    cart.shippingPrice = (Number(cart.itemsPrice) > 100 ? 0 : 10).toFixed(2);

    cart.taxPrice = (0.082 * Number(cart.itemsPrice)).toFixed(2);

    const price = Number(cart.itemsPrice);
    const shipping = Number(cart.shippingPrice);
    const tax = Number(cart.taxPrice);

    const total = (price + shipping + tax).toFixed(2);

    const stripeTotal = (price + shipping + tax) * 100;

    if (!cart.paymentMethod) {
        history.push("/payment");
    }

    useEffect(() => {
        window.scrollTo(0, 0);

        if (success) {
            history.push(`/profile`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [success, history]);

    const placeOrder = (e) => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: total,
            })
        );
    };

    const backHandler = (e) => {
        e.preventDefault();
        history.push("/payment");
    };

    return (
        <Container style={{ marginTop: "70px", minHeight: "90vh" }}>
            <CheckoutProcess step3 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping: </strong>
                                {cart.shippingAddress.address},{" "}
                                {cart.shippingAddress.city},{" "}
                                {cart.shippingAddress.postalCode},{" "}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message variant="info">
                                    You cart is empty
                                </Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
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
                                                <Col>
                                                    <Link
                                                        style={{
                                                            color: "#000",
                                                        }}
                                                        to={`/product/${item.id}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x € {item.price}{" "}
                                                    = €{" "}
                                                    {(
                                                        item.qty * item.price
                                                    ).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Item: </Col>
                                    <Col>€ {cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>€ {cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>€ {cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>€ {total}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && (
                                    <Message variant="danger">{error}</Message>
                                )}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block mb-2 border-dark btn-light"
                                    onClick={backHandler}
                                >
                                    Back
                                </Button>

                                <StripeCheckout
                                    label="Pay Now"
                                    name="Fabrique"
                                    billingAddress
                                    shippingAddress
                                    style={btnStyle}
                                    amount={stripeTotal}
                                    panelLabel="Pay Now"
                                    token={placeOrder}
                                    stripeKey={publishableKey}
                                    triggerEvent="onClick"
                                />
                                <p style={{ margin: "20px 0", color: "red" }}>
                                    To test the Stripe payment method please use
                                    the following details:<br></br> Card No:
                                    4242424242424242<br></br> CVC: 111<br></br>{" "}
                                    Date: Any future date
                                </p>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default PlaceOrderPage;
