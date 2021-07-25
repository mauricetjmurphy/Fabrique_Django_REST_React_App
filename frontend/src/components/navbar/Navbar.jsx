import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";

function Header() {
    // Use history hook to access the react router history object
    const history = useHistory();

    // Initializing the useDispatch object
    const dispatch = useDispatch();

    //Getting the userLogin state from the store.js
    const userLogin = useSelector((state) => state.userLogin);
    //The userLogin variable holds the userReducer and from this we can destructure the data from the variable
    const { loading, userInfo, error } = userLogin;

    const logoutHandler = (e) => {
        // dispatch the logout action and redirect the user to the login page
        dispatch(logout());
        history.push("/login");
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>FABRIQUE</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/products/men">
                            <Nav.Link>Men</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/products/women">
                            <Nav.Link>Women</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav>
                        {userInfo ? (
                            <NavDropdown
                                title={userInfo.first_name}
                                id="username"
                            >
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to="/login">
                                <Nav.Link>
                                    <i className="fas fa-user pl-2 pr-2"></i>
                                    Login
                                </Nav.Link>
                            </LinkContainer>
                        )}

                        <LinkContainer to="/whishlist">
                            <Nav.Link>
                                <i className="far fa-heart pl-2 pr-2"></i>
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/cart">
                            <Nav.Link>
                                <i className="fas fa-shopping-cart pl-2 pr-2"></i>
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
