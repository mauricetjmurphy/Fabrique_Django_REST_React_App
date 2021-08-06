import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Container, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutProcess from "../../components/checkout-process/CheckoutProcess";
import { savePaymentMethod } from "../../actions/cartActions";

function PaymentPage() {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const dispatch = useDispatch();
    let history = useHistory();

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
                            type="radio"
                            label="Paypal"
                            id="paypal"
                            name="paymentMethod1"
                            value="PayPal"
                            onChange={(e) => {
                                setPaymentMethod(e.target.value);
                            }}
                        ></Form.Check>
                        <Form.Check
                            type="radio"
                            label="Credit or Debit Card"
                            id="stripe"
                            name="paymentMethod2"
                            value="Stripe"
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
