import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CheckoutProcess({ step1, step2, step3 }) {
    return (
        <Nav className="justify-content-center m-3">
            <Nav.Item className="ml-3 mr-3">
                {step1 ? (
                    <LinkContainer
                        className={
                            step1 ? "border-bottom border-dark" : "botder-0"
                        }
                        style={{
                            color: "#000",
                        }}
                        to="/shipping"
                    >
                        <Nav.Link>Shipping</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Shipping</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item className="ml-3 mr-3">
                {step2 ? (
                    <LinkContainer
                        className={
                            step2 ? "border-bottom border-dark" : "botder-0"
                        }
                        style={{
                            color: "#000",
                        }}
                        to="/payment"
                    >
                        <Nav.Link>Payment</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Payment</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item className="ml-3 mr-3">
                {step3 ? (
                    <LinkContainer
                        className={
                            step3 ? "border-bottom border-dark" : "botder-0"
                        }
                        style={{
                            color: "#000",
                        }}
                        to="/order"
                    >
                        <Nav.Link>Order</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Order</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    );
}

export default CheckoutProcess;
