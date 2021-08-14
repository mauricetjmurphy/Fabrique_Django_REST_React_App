import React from "react";
import styled from "styled-components";

const SocialContainer = styled.div`
    display: flex;
    margin: 0 auto;
`;

const IconContainer = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #86868a;
    background: #5b5b5e;
    margin: 20px;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`;

function SocialMedia() {
    return (
        <SocialContainer>
            <IconContainer href="https://www.facebook.com/" target="_blank">
                <i class="fab fa-facebook-f"></i>
            </IconContainer>
            <IconContainer href="https://www.instagram.com/" target="_blank">
                <i class="fab fa-instagram"></i>
            </IconContainer>
            <IconContainer href="https://www.linkedin.com/" target="_blank">
                <i class="fab fa-linkedin-in"></i>
            </IconContainer>
        </SocialContainer>
    );
}

export default SocialMedia;
