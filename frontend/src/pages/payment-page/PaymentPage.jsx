import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Form, Button, Row, Container, Col, FormCheck } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutProcess from "../../components/checkout-process/CheckoutProcess";
import { savePaymentMethod } from "../../actions/cartActions";

function PaymentPage() {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const dispatch = useDispatch();
    const history = useHistory();

    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    if (!shippingAddress.address) {
        history.push("/shipping");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push("/place-order");
    };

    return (
        <Container>
            <CheckoutProcess step1 step2 step3 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Payment Method</Form.Label>
                    <Col>
                        <Form.Check
                            required
                            type="radio"
                            label="Paypal or Credit Card"
                            id="paypal"
                            name="paymentMethod"
                            value="PayPal"
                            onChange={(e) => {
                                setPaymentMethod(e.target.value);
                            }}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                <Button type="submit">Continue</Button>
            </Form>
        </Container>
    );
}

export default PaymentPage;
