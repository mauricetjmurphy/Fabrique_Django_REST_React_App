import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import SearchBox from "../search-box/SearchBox";
import Bars from "../../static/images/menu-bars.svg";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { toggleSidemenu } from "../../actions/pageActions";
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

const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    text-decoration: none;
`;

const BrandContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Brand = styled(Link)`
    color: #fff;
    font-size: 1.5rem;
`;

const Toggle = styled.i`
    display: none;

    @media screen and (max-width: 850px) {
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

    @media screen and (max-width: 850px) {
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

    console.log(navbarFade);

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
                <NavLink onClick={sidemenuToggle}>Shop</NavLink>
            </BrandContainer>

            <Toggle onClick={dropdownToggle} />

            <NavMenu>
                {userInfo && userInfo.isAdmin && (
                    <NavDropdown
                        title={<i className="fas fa-user-cog "></i>}
                        id="adminmenu"
                    >
                        <LinkContainer to="/user-list/?param=">
                            <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/product-list/?category=">
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
                            </Nav.Link>
                        </LinkContainer>
                    )}

                    <LinkContainer to="/wishlist">
                        <Nav.Link>
                            <i className="far fa-heart pl-2 pr-2"></i>
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/cart">
                        <Nav.Link>
                            {/* <i className="fas fa-shopping-bag pl-2 pr-2"></i> */}
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
