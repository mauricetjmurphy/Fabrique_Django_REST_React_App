import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
    const style = {
        backgroundColor: "#F8F8F8",
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        padding: "20px",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "60px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: "50%",
    };

    return (
        <footer style={style}>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; Maurice Murphy
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
