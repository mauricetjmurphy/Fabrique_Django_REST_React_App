import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import SearchBox from "../search-box/SearchBox";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import Bag from "../bag/Bag";

const DropdownContainer = styled.div`
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 100vh;
    background: #111;
    display: grid;
    top: 70px;
    left: 0;
    opacity: 0.9;
    transition: 0.5s ease-in-out;
    opacity: ${({ isDropdownOpen }) => (isDropdownOpen ? "1" : "0")};
    top: ${({ isDropdownOpen }) => (isDropdownOpen ? "70px" : "-100%")};
`;

const DropdownWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DropdownMenu = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 80px);
    text-align: center;
    margin-bottom: 4rem;
`;
const DropdownLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.2rem;
    text-decoration: none;
    list-style: none;
    cursor: pointer;
    transition: 0ms.2s ease-in-out;

    &:hover {
        text-decoration: underline;
    }

    @media screen and (max-width: 460px) {
        grid-template-rows: repeat(4, 60px);
    }
`;

const SearchContainer = styled.div`
    margin-top: 3rem;
`;

function Dropdown({ dropdownToggle, isDropdownOpen }) {
    //Getting the userLogin state from the store.js
    const userLogin = useSelector((state) => state.userLogin);
    //The userLogin variable holds the userReducer and from this we can destructure the data from the variable
    const { userInfo } = userLogin;

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    return (
        <DropdownContainer isDropdownOpen={isDropdownOpen}>
            <DropdownWrapper>
                <DropdownMenu>
                    <DropdownLink>
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown
                                title={<i className="fas fa-user-cog"></i>}
                                id="adminmenu"
                            >
                                <LinkContainer
                                    onClick={dropdownToggle}
                                    to="/user-list/?param="
                                >
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer
                                    onClick={dropdownToggle}
                                    to="/product-list/?category="
                                >
                                    <NavDropdown.Item>
                                        Products
                                    </NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                    </DropdownLink>
                    <DropdownLink>
                        {userInfo ? (
                            <NavDropdown
                                title={<i className="far fa-user"></i>}
                                id="username"
                            >
                                <LinkContainer
                                    onClick={dropdownToggle}
                                    to="/profile"
                                >
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer onClick={dropdownToggle} to="/login">
                                <Nav.Link>
                                    <i className="fas fa-user pl-2 pr-2"></i>
                                    Login
                                </Nav.Link>
                            </LinkContainer>
                        )}
                    </DropdownLink>
                    <DropdownLink>
                        <LinkContainer onClick={dropdownToggle} to="/whishlist">
                            <Nav.Link>
                                <i className="far fa-heart pl-2 pr-2"></i>
                            </Nav.Link>
                        </LinkContainer>
                    </DropdownLink>
                    <DropdownLink>
                        <LinkContainer onClick={dropdownToggle} to="/cart">
                            <Nav.Link>
                                <Bag number={cartItems.length} />
                            </Nav.Link>
                        </LinkContainer>
                    </DropdownLink>
                    <SearchContainer>
                        <SearchBox />
                    </SearchContainer>
                </DropdownMenu>
            </DropdownWrapper>
        </DropdownContainer>
    );
}

export default Dropdown;