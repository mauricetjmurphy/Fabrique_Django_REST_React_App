import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Nav, Form, FormControl, Button } from "react-bootstrap";

function Header() {
    return (
        <div>
            <>
                <Navbar bg="light" variant="light">
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                        />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar>
            </>
        </div>
    );
}

export default Header;
