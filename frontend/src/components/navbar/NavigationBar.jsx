import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { toggleSidemenu } from "../../actions/pageActions";
import SearchBox from "../search-box/SearchBox";
import Bag from "../bag/Bag";

import "./navbar.css";
import { getCartItems } from "../../actions/cartActions";

function NavigationBar() {
    // Use history hook to access the react router history object
    const history = useHistory();

    // Initializing the useDispatch object
    const dispatch = useDispatch();

    const [navbarFade, setNavBarFade] = useState(false);

    const [toggle, setToggle] = useState(false);

    //Getting the userLogin state from the store.js
    const userLogin = useSelector((state) => state.userLogin);
    //The userLogin variable holds the userReducer and from this we can destructure the data from the variable
    const { userInfo } = userLogin;

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const logoutHandler = (e) => {
        // dispatch the logout action and redirect the user to the login page
        dispatch(logout());
        history.push("/login");
    };

    const productMenuHandler = () => {
        dispatch(toggleSidemenu());
    };

    const toggleHandler = () => {
        setToggle(!toggle);
    };

    const fadeNav = () => {
        if (window.scrollY >= 35) {
            setNavBarFade(true);
        } else {
            setNavBarFade(false);
        }
    };

    window.addEventListener("scroll", fadeNav);

    return (
        <Navbar
            className={`${navbarFade ? "navbar active" : "navbar"}, ${
                toggle && "toggle"
            }`}
            collapseOnSelect
            expand="lg"
            id="navbar"
        >
            <Container>
                <LinkContainer style={{ color: "#fff" }} to="/">
                    <Navbar.Brand>FABRIQUE</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle
                    style={{ color: "#fff" }}
                    onClick={toggleHandler}
                    aria-controls="responsive-navbar-nav"
                />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link
                            className="text-white"
                            onClick={productMenuHandler}
                        >
                            Shop
                        </Nav.Link>
                    </Nav>
                    <SearchBox />
                    {userInfo && userInfo.isAdmin && (
                        <NavDropdown
                            title={<i className="fas fa-user-cog"></i>}
                            id="adminmenu"
                        >
                            <LinkContainer to="/user-list/?param=">
                                <NavDropdown.Item
                                    onClick={toggle && { toggleHandler }}
                                >
                                    Users
                                </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/product-list/?category=">
                                <NavDropdown.Item
                                    onClick={toggle && { toggleHandler }}
                                >
                                    Products
                                </NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                    )}

                    <Nav>
                        {userInfo ? (
                            <NavDropdown
                                title={<i className="far fa-user"></i>}
                                id="username"
                            >
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item
                                        onClick={toggle && { toggleHandler }}
                                    >
                                        Profile
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to="/login">
                                <Nav.Link onClick={toggle && { toggleHandler }}>
                                    <i className="fas fa-user pl-2 pr-2"></i>
                                    Login
                                </Nav.Link>
                            </LinkContainer>
                        )}

                        <LinkContainer to="/whishlist">
                            <Nav.Link onClick={toggle && { toggleHandler }}>
                                <i className="far fa-heart pl-2 pr-2"></i>
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/cart">
                            <Nav.Link onClick={toggle && { toggleHandler }}>
                                {/* <i className="fas fa-shopping-bag pl-2 pr-2"></i> */}
                                <Bag number={cartItems.length} />
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
