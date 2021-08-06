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

    return (
        <ul
            style={{ height: height }}
            className={toggle ? "product-menu show" : "product-menu"}
        >
            <li>
                <Link to={`/products/`} className="link">
                    All categories
                </Link>
            </li>
            <li>
                <Link to={`/products/?category=Coats`} className="link">
                    Coats
                </Link>
            </li>
            <li>
                <Link to="/products/?category=Jackets" className="link">
                    Jackets
                </Link>
            </li>
            <li>
                <Link to="/products/?category=Shirts" className="link">
                    Shirts
                </Link>
            </li>
            <li>
                <Link to="/products/?category=Shoes" className="link">
                    Shoes
                </Link>
            </li>
            <li>
                <Link to="/products/?category=Shorts" className="link">
                    Shorts
                </Link>
            </li>
            <li>
                <Link to="/products/?category=Trousers" className="link">
                    Trousers
                </Link>
            </li>
        </ul>
    );
}

export default Sidemenu;
