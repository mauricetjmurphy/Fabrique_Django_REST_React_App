import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../../actions/userActions";

function HomePage() {
    const dispatch = useDispatch();
    let history = useHistory();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        }
        // ---------Insert Modal to check if the action is intended-------//
        dispatch(listUsers());
    }, [dispatch]);

    return (
        <Container style={{ marginTop: "70px", minHeight: "100vh" }}>
            <Row className="justify-content-md-center">
                <h1 className="text-center p-5">
                    Hello world, welcome to the Fabrique app!
                </h1>
            </Row>

            <section>Section 1</section>
            <section>Section 2</section>
            <section>Section 3</section>
            <section>Section 4</section>
        </Container>
    );
}

export default HomePage;
