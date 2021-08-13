import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { toggleSidemenu } from "../../actions/pageActions";
import SearchBox from "../search-box/SearchBox";
import styled from "styled-components";
import "./sidemenu.css";

function Sidemenu({ isSidemenuOpen, sidemenuToggle }) {
    console.log(isSidemenuOpen);

    return (
        <ul className={isSidemenuOpen ? "product-menu show" : "product-menu"}>
            <li>
                <Link
                    to={`/products/?category=&page=1`}
                    className="link"
                    onClick={sidemenuToggle}
                >
                    All categories
                </Link>
            </li>
            <li>
                <Link
                    to="/products/?category=Bags&page=1"
                    className="link"
                    onClick={sidemenuToggle}
                >
                    Bags
                </Link>
            </li>
            <li>
                <Link
                    to={`/products/?category=Coats&page=1`}
                    className="link"
                    onClick={sidemenuToggle}
                >
                    Coats
                </Link>
            </li>
            <li>
                <Link
                    to="/products/?category=Hoodies&page=1"
                    className="link"
                    onClick={sidemenuToggle}
                >
                    Hoodies
                </Link>
            </li>
            <li>
                <Link
                    to="/products/?category=Jeans&page=1"
                    className="link"
                    onClick={sidemenuToggle}
                >
                    Jeans
                </Link>
            </li>
            <li>
                <Link
                    to="/products/?category=Knitwear&page=1"
                    className="link"
                    onClick={sidemenuToggle}
                >
                    Knitwear
                </Link>
            </li>
            <li>
                <Link
                    to="/products/?category=Shirts&page=1"
                    className="link"
                    onClick={sidemenuToggle}
                >
                    Shirts
                </Link>
            </li>
            <li>
                <Link
                    to="/products/?category=Shoes&page=1"
                    className="link"
                    onClick={sidemenuToggle}
                >
                    Shoes
                </Link>
            </li>
            <li>
                <Link
                    to="/products/?category=Shorts&page=1"
                    className="link"
                    onClick={sidemenuToggle}
                >
                    Shorts
                </Link>
            </li>
            <li>
                <Link
                    to="/products/?category=Suits&page=1"
                    className="link"
                    onClick={sidemenuToggle}
                >
                    Suits
                </Link>
            </li>
            <li>
                <Link
                    to="/products/?category=Trousers&page=1"
                    className="link"
                    onClick={sidemenuToggle}
                >
                    Trousers
                </Link>
            </li>
        </ul>
    );
}

export default Sidemenu;
