import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { Transition, animate, Spring } from "react-spring";

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

function Hero({ SlideData }) {
    const [current, setCurrent] = useState(0);
    const length = SlideData.length;
    const timeout = useRef(null);
    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };
    const nextPrevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    console.log(SlideData);

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
    return (
        <HeroSection>
            <HeroWrapper>
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
