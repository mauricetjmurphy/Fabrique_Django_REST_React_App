import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { toggleSidemenu } from "../../actions/pageActions";
import SearchBox from "../search-box/SearchBox";
import "./sidemenu.css";

function Sidemenu(height) {
    // Initializing the useDispatch object
    const dispatch = useDispatch();

    const toggleSidemenuState = useSelector((state) => state.toggleSidemenu);
    const { toggle } = toggleSidemenuState;

    const closeSideMenu = () => {
        dispatch(toggleSidemenu());
    };

    return (
        <ul
            style={{ height: height }}
            className={toggle ? "product-menu show" : "product-menu"}
        >
            <li>
                <Link
                    to={`/products/?category=&page=1`}
                    className="link"
                    onClick={closeSideMenu}
                >
                    All categories
                </Link>
            </li>
            <li>
                <Link
                    to={`/products/?category=Coats`}
                    className="link"
                    onClick={closeSideMenu}
                >
                    Coats
                </Link>
            </li>
            <li>
                <Link
                    to="/products/?category=Hoodies"
                    className="link"
                    onClick={closeSideMenu}
                >
                    Hoodies
                </Link>
            </li>
            <li>
                <Link
                    to="/products/?category=Shirts"
                    className="link"
                    onClick={closeSideMenu}
                >
                    Shirts
                </Link>
            </li>
            <li>
                <Link
                    to="/products/?category=Shoes"
                    className="link"
                    onClick={closeSideMenu}
                >
                    Shoes
                </Link>
            </li>
            <li>
                <Link
                    to="/products/?category=Shorts"
                    className="link"
                    onClick={closeSideMenu}
                >
                    Shorts
                </Link>
            </li>
            <li>
                <Link
                    to="/products/?category=Ties"
                    className="link"
                    onClick={closeSideMenu}
                >
                    Ties
                </Link>
            </li>
        </ul>
    );
}

export default Sidemenu;
