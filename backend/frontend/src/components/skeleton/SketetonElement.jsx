import React from "react";
import "./skeleton.css";

const SketetonElement = ({ type }) => {
    const classes = `skeleton pulse ${type}`;
    return <div className={classes}></div>;
};

export default SketetonElement;
