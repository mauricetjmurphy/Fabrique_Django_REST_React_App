import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";

const HeroSection = styled.section`
    height: 100vh;
    max-height: 1100px;
    position: relative;
    overflow: hidden;
    margin-top: 20px;
`;

const HeroWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
`;

const HeroSlide = styled.div`
    z-index: 1;
    width: 100%auto;
    height: 100%auto;
`;
const HeroSlider = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
        content: "";
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100vh;
        bottom: 0vh;
        left: 0;
        overflow: hidden;
        opacity: 0.4;
        background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.2) 0%,
            rgba(0, 0, 0, 0.2) 50%,
            rgba(0, 0, 0, 0.6) 100%
        );
    }
`;
const HeroImage = styled.img`
    position: relative;
    top: 0;
    left: 0;
    width: 100vw !important;
    height: 100vh !important;
    object-fit: cover;
    animation: fadeInOut 3s;

    @keyframes fadeInOut {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`;

const HeroContentContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 3;
`;

const HeroText = styled.p`
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 50;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 48px;
    font-weight: bold;
    letter-spacing: 4px;
    text-align: center;
`;

const Button = styled.a`
    position: absolute;
    top: 70%;
    left: 50%;
    z-index: 5;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 20px;
    letter-spacing: 2px;
    text-align: center;
    background: #111;
    padding: 10px 20px;
    border: 1px solid #fff;
    opacity: 0.5;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        text-decoration: none;
        background: #fff;
        color: #111;
    }
`;

function Hero({ SlideData }) {
    const history = useHistory();
    const [current, setCurrent] = useState(0);
    const length = SlideData.length;
    const timeout = useRef(null);
    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };
    const nextPrevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    useEffect(() => {
        const nextSlide = () => {
            setCurrent((current) => (current === length - 1 ? 0 : current + 1));
        };
        timeout.current = setTimeout(nextSlide, 3000);
        return function () {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        };
    }, [current, length]);

    const shopHandle = () => {
        history.push("/products/?category=&page=1");
    };

    return (
        <HeroSection>
            <HeroWrapper>
                <HeroContentContainer>
                    <HeroText>One Stop Fashion</HeroText>
                    <Button onClick={shopHandle}>Shop Collection</Button>
                </HeroContentContainer>

                {SlideData.map((slide, index) => (
                    <HeroSlide key={index}>
                        {index === current && (
                            <HeroSlider style={{ background: "#111" }}>
                                <HeroImage src={slide.image}></HeroImage>
                            </HeroSlider>
                        )}
                    </HeroSlide>
                ))}
            </HeroWrapper>
        </HeroSection>
    );
}

export default Hero;
