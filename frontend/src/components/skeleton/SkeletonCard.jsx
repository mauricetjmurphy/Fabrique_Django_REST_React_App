import React from "react";
import SkeletonElement from "./SketetonElement";

const SkeletonCard = () => {
    return (
        <div className="skeleton-wrapper">
            <div className="skeleton-card">
                <SkeletonElement type="thumbnail" />
                <SkeletonElement type="title" />
                <SkeletonElement type="text" />
            </div>
        </div>
    );
};

export default SkeletonCard;
