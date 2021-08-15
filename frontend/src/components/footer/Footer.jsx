import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import SocialMedia from "../social-media/SocialMedia";

const FooterSection = styled.div`
    background: #111111;
    color: #fff;
    border-top: 4px solid #86868a;

    text-align: center;
    padding: 20px;
    left: 0;
    bottom: 0;
    height: 150px;
    width: 100%;
    display: flex;
    justify-content: center;
`;

function Footer() {
    return (
        <FooterSection>
            <Container>
                <Row>
                    <SocialMedia />
                </Row>
                <Row>
                    <Col className="text-center">
                        Copyright &copy; Maurice Murphy
                    </Col>
                </Row>
            </Container>
        </FooterSection>
    );
}

export default Footer;
