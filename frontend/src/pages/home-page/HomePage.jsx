import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Hero from "../../components/hero/Hero";
import SlideData from "../../static/data/SlideData";
import styled from "styled-components";
import SectionTwo_ImageOne from "../../static/images/s2_img1.jpg";
import SectionTwo_ImageTwo from "../../static/images/s2_img2.jpg";

const SectionTwo = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    margin: 20px 0 10px 0;
`;

const SectionTwoImg = styled.img`
    object-fit: cover;
`;

const SectionThree = styled.div``;

const SectionFour = styled.div``;

function HomePage() {
    const dispatch = useDispatch();
    let history = useHistory();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        }
    }, []);

    return (
        <Container style={{ marginTop: "70px" }}>
            <Hero SlideData={SlideData} />

            <SectionTwo>
                <SectionTwoImg src={SectionTwo_ImageOne} alt="" />
                <SectionTwoImg src={SectionTwo_ImageTwo} alt="" />
            </SectionTwo>

            <SectionThree>
                <img src="" alt="" />
            </SectionThree>

            <SectionFour>
                <img src="" alt="" />
            </SectionFour>
        </Container>
    );
}

export default HomePage;
