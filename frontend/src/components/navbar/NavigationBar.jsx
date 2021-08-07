import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { toggleSidemenu } from "../../actions/pageActions";
import "./navbar.css";
import SearchBox from "../search-box/SearchBox";

function NavigationBar() {
    // Use history hook to access the react router history object
    const history = useHistory();

    // Initializing the useDispatch object
    const dispatch = useDispatch();

    const [navbar, setNavBar] = useState(false);

    //Getting the userLogin state from the store.js
    const userLogin = useSelector((state) => state.userLogin);
    //The userLogin variable holds the userReducer and from this we can destructure the data from the variable
    const { userInfo } = userLogin;

    const logoutHandler = (e) => {
        // dispatch the logout action and redirect the user to the login page
        dispatch(logout());
        history.push("/login");
    };

    const productMenuHandler = () => {
        dispatch(toggleSidemenu());
    };

    const fadeNav = () => {
        if (window.scrollY >= 35) {
            setNavBar(true);
        } else {
            setNavBar(false);
        }
    };

    window.addEventListener("scroll", fadeNav);

    return (
        <Navbar
            className={navbar ? "navbar active" : "navbar"}
            collapseOnSelect
            expand="lg"
            bg="dark"
            variant="dark"
            id="navbar"
        >
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>FABRIQUE</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
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
                            <LinkContainer to="/admin/user-list/?param=">
                                <NavDropdown.Item>Users</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/admin/products/">
                                <NavDropdown.Item>Products</NavDropdown.Item>
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
                                <i className="fas fa-shopping-bag pl-2 pr-2"></i>
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
