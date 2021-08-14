import React, { useState, useEffect } from "react";

function Rating({ value, color }) {
    // const [rating, setRating] = useState();

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setRating(value);
    //     }, 2000);
    //     return () => clearTimeout(timer);

    //     // if (value !== "undefined") {
    //     //     setRating(value);
    //     // }
    // }, [value]);

    return (
        <div>
            <span>
                <i
                    style={{ color }}
                    className={value >= 1 ? "fas fa-star" : null}
                ></i>
            </span>
            <span>
                <i
                    style={{ color }}
                    className={value >= 2 ? "fas fa-star" : null}
                ></i>
            </span>
            <span>
                <i
                    style={{ color }}
                    className={value >= 3 ? "fas fa-star" : null}
                ></i>
            </span>
            <span>
                <i
                    style={{ color }}
                    className={value >= 4 ? "fas fa-star" : null}
                ></i>
            </span>
            <span>
                <i
                    style={{ color }}
                    className={value >= 5 ? "fas fa-star" : null}
                ></i>
            </span>
        </div>
    );
}

export default Rating;
