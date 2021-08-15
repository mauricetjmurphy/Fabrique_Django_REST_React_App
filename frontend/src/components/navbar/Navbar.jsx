import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import SearchBox from "../search-box/SearchBox";
import Bars from "../../static/images/menu-bars.svg";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import Bag from "../bag/Bag";
import "./navbar.css";

const NavContainer = styled.nav`
    height: 70px;
    background: #111;
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    position: fixed;
    width: 100%;
    z-index: 50;
`;

const BrandContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Brand = styled(Link)`
    color: #fff;
    font-size: 1.5rem;

    &:hover {
        color: #fff;
    }
`;

const Toggle = styled.i`
    display: none;

    @media screen and (max-width: 980px) {
        display: block;
        background-image: url(${Bars});
        background-size: contain;
        height: 40px;
        width: 40px;
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-50%, 40%);
    }
`;

const NavMenu = styled.div`
    display: flex;
    align-items: center;

    @media screen and (max-width: 980px) {
        display: none;
    }
`;

function NewNavbar({ dropdownToggle, sidemenuToggle }) {
    const [navbarFade, setNavBarFade] = useState();
    // Use history hook to access the react router history object
    const history = useHistory();

    // Initializing the useDispatch object
    const dispatch = useDispatch();

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

    useEffect(() => {
        window.onscroll = () => {
            if (window.scrollY >= 35) {
                setNavBarFade(true);
            } else {
                setNavBarFade(false);
            }
        };
    }, [navbarFade]);

    return (
        <NavContainer
            style={
                navbarFade
                    ? { opacity: "0.6", transition: "1s ease-in-out" }
                    : { opacity: "1", transition: "1s ease-in-out" }
            }
        >
            <BrandContainer>
                <Brand to="/">Fabrique</Brand>
            </BrandContainer>

            <Toggle onClick={dropdownToggle} />

            <NavMenu>
                {userInfo && userInfo.isAdmin && (
                    <NavDropdown
                        title="Admin"
                        style={{ color: "#fff" }}
                        id="adminmenu"
                    >
                        <LinkContainer to="/user-list/?param=">
                            <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/product-list/?category=&page=1">
                            <NavDropdown.Item>Products</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                )}

                <Nav>
                    <div>
                        <Nav.Link onClick={sidemenuToggle}>Shop</Nav.Link>
                    </div>

                    <LinkContainer to="/wishlist">
                        <Nav.Link>Wishlist</Nav.Link>
                    </LinkContainer>

                    {userInfo ? (
                        <NavDropdown title="Account" id="username">
                            <LinkContainer to="/profile/?param=&page=1">
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={logoutHandler}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <LinkContainer to="/login">
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                    )}

                    <LinkContainer to="/cart">
                        <Nav.Link>
                            <Bag number={cartItems.length} />
                        </Nav.Link>
                    </LinkContainer>
                </Nav>
            </NavMenu>
            <NavMenu>
                <SearchBox />
            </NavMenu>
        </NavContainer>
    );
}

export default NewNavbar;
