import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
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
        <Container>
            <CheckoutProcess step1 step2 />
            <h1>Shipping</h1>
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
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    );
};

export default ShippingPage;
