import React, { useState } from "react";
import styled from "styled-components";
import { parse } from "papaparse";

var fs = require("fs");

const FileDropContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 200px;
`;

const FileDropArea = styled.div`
    border: 1px dashed #ababab;
    width: 80%;
    height: 100%;
`;

const FileDropText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ababab;
`;

const FileDrop = () => {
    const [highlighted, setHighlighted] = useState();

    return (
        <FileDropContainer>
            <FileDropArea
                className={`${
                    highlighted && "border border-success text-primary"
                }`}
                onDragEnter={(e) => {
                    e.preventDefault();
                    setHighlighted(true);
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    setHighlighted(false);
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    Array.from(e.dataTransfer.files)
                        .filter((file) => file.type === "text/csv")
                        .forEach(async (file) => {
                            const text = await file.text();
                            const res = parse(text, { header: true });
                            console.log(res);
                        });
                }}
            >
                <FileDropText
                    className={`${highlighted && "text-success"}`}
                    onDragEnter={(e) => {
                        e.preventDefault();
                        setHighlighted(true);
                    }}
                >
                    DROP FILE HERE
                </FileDropText>
            </FileDropArea>
        </FileDropContainer>
    );
};

export default FileDrop;
