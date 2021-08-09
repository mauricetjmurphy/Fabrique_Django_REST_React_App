import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";

const FooterSection = styled.div`
    background: #111111;
    color: #fff;
    border-top: 1px solid #e7e7e7;
    text-align: center;
    padding: 20px;
    left: 0;
    bottom: 0;
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function Footer() {
    return (
        <FooterSection>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; Maurice Murphy
                    </Col>
                </Row>
            </Container>
        </FooterSection>
    );
}

export default Footer;
