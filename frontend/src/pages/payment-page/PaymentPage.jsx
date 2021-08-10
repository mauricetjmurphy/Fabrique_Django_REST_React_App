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

    const backHandler = (e) => {
        e.preventDefault();
        history.push("/shipping");
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push("/place-order");
    };

    return (
        <Container style={{ marginTop: "70px", minHeight: "90vh" }}>
            <CheckoutProcess step2 />
            <h1>Payment</h1>
            <Col lg={4} md={4}>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as="legend">
                            Select Payment Method
                        </Form.Label>

                        <Form.Check
                            required
                            type="radio"
                            label="Credit or Debit Card"
                            id="stripe"
                            name="paymentMethod2"
                            value="Stripe"
                            onChange={(e) => {
                                setPaymentMethod(e.target.value);
                            }}
                        ></Form.Check>
                    </Form.Group>
                    <Button
                        className="btn-block btn-light border-dark"
                        type="button"
                        onClick={backHandler}
                    >
                        Back
                    </Button>
                    <Button className="btn-block btn-dark" type="submit">
                        Continue
                    </Button>
                </Form>
            </Col>
        </Container>
    );
}

export default PaymentPage;
