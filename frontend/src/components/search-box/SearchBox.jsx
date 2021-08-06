import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {
    Form,
    Navbar,
    Nav,
    Container,
    NavDropdown,
    Button,
} from "react-bootstrap";
import "./search-box.css";

function SearchBox() {
    const [keyword, setKeyword] = useState();
    let history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
            history.push(`/products/search/?keyword=${keyword}`);
        } else {
            history.push(history.push(history.location.pathname));
        }
    };

    return (
        <Form style={{ marginRight: "30px" }} onSubmit={submitHandler} inline>
            <Form.Control
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                className=""
                style={{
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                    height: "30px",
                }}
            ></Form.Control>
            <Button
                style={{
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "0px",
                    borderLeft: "none",
                    height: "30px",
                    fontSize: "14px",
                    lineHeight: "14px",
                }}
                type="submit"
                variant="outline-light"
                className="search-btn"
            >
                <i className="fas fa-search"></i>
            </Button>
        </Form>
    );
}

export default SearchBox;
