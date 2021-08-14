import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../actions/cartActions";
import CheckoutProcess from "../../components/checkout-process/CheckoutProcess";

const ShippingPage = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const dispatch = useDispatch();
    let history = useHistory();

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        history.push("/payment");
    };

    return (
        <Container style={{ marginTop: "70px", minHeight: "90vh" }}>
            <CheckoutProcess step1 />
            <h1>Shipping</h1>
            <Col md={6}>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="address">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter address"
                            value={address ? address : ""}
                            onChange={(e) => setAddress(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter city"
                            value={city ? city : ""}
                            onChange={(e) => setCity(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="postal code">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter postal code"
                            value={postalCode ? postalCode : ""}
                            onChange={(e) => setPostalCode(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="postal code">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter a country"
                            value={country ? country : ""}
                            onChange={(e) => setCountry(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button className="btn-block btn-dark" type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
        </Container>
    );
};

export default ShippingPage;
