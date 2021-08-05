import React from "react";
import { Navbar, Nav, Container, NavDropdown, Row } from "react-bootstrap";

function HomePage() {
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
