import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Hero from "../../components/hero/Hero";
import SlideData from "../../static/data/SlideData";
import styled from "styled-components";

const SectionTwo = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    margin: 20px 0 10px 0;

    @media screen and (max-width: 450px) {
        margin: 5px 0px;
        grid-gap: 5px;
    }
`;

const SectionTwoImg = styled.img`
    object-fit: cover;
    cursor: pointer;

    @media screen and (max-width: 450px) {
        margin: 0px;
    }
`;

const SectionTwoContent = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    text-align: center;
    z-index: 10;
    cursor: pointer;
`;

const SectionThree = styled.div`
    margin-top: 20px;
    overflow: hidden;
    position: relative;

    @media screen and (max-width: 450px) {
        margin: 0px;
        padding-bottom: 5px;
    }
`;

const SectionThreeImg = styled.img`
    object-fit: cover;
    cursor: pointer;
    padding-bottom: 20px;

    @media screen and (max-width: 450px) {
        margin: 0px;
        padding-bottom: 5px;
    }
`;

const SectionThreeContent = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    text-align: center;
    cursor: pointer;
`;

function HomePage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Hero SlideData={SlideData} />
            <Container>
                <SectionTwo>
                    <LinkContainer
                        style={{ position: "relative" }}
                        to="/products/?category=Coats&page=1"
                    >
                        <div>
                            <SectionTwoImg
                                src="https://fabrique-bucket.s3.eu-west-1.amazonaws.com/s2_img1.jpg"
                                alt="Fashion image"
                            />
                            <SectionTwoContent>
                                <h1>Mens Coats</h1>
                            </SectionTwoContent>
                        </div>
                    </LinkContainer>

                    <LinkContainer
                        style={{ position: "relative" }}
                        to="/products/?category=T-Shirts&page=1"
                    >
                        <div>
                            <SectionTwoImg
                                src="https://fabrique-bucket.s3.eu-west-1.amazonaws.com/s2_img2.jpg"
                                alt="Fashion image"
                            />
                            <SectionTwoContent>
                                <h1>Mens T-Shirts</h1>
                            </SectionTwoContent>
                        </div>
                    </LinkContainer>
                </SectionTwo>

                <LinkContainer
                    style={{ position: "relative" }}
                    to="/products/?category=Shoes&page=1"
                >
                    <SectionThree>
                        <SectionThreeImg
                            src="https://fabrique-bucket.s3.eu-west-1.amazonaws.com/s3_img1.jpg"
                            alt="Fashion image"
                        />
                        <SectionThreeContent>
                            <h1>Mens Shoes</h1>
                        </SectionThreeContent>
                    </SectionThree>
                </LinkContainer>
            </Container>
        </div>
    );
}

export default HomePage;
