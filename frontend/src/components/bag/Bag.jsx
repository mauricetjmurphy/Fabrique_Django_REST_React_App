import React from "react";
import styled from "styled-components";

const BagItemsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BagItemsAmt = styled.div`
    position: relative;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: #fff;
    margin: 10px 0 0 5px;
`;

const BagItemsNum = styled.p`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 8px;
    font-weight: bold;
    line-height: 15px;
`;

const Bag = ({ number }) => {
    return (
        <BagItemsContainer>
            <div>
                <i className="fas fa-shopping-bag"></i>
            </div>

            {number > 0 && (
                <BagItemsAmt>
                    <BagItemsNum>{number}</BagItemsNum>
                </BagItemsAmt>
            )}
        </BagItemsContainer>
    );
};

export default Bag;
