import React, { useState } from "react";
import "./pagination-component.css";
import { Link, useHistory } from "react-router-dom";

const PaginationComponent = ({ page, pages }) => {
    const history = useHistory();

    const [data, setData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const pageNumbers = [...Array(pages).keys()];

    // const searchParam = history.location.search;
    const searchParam = history.location.search.split("&")[0];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const handleClick = (e) => {
        setCurrentPage(Number(e.target.id));
    };

    const renderPageNumbers = pageNumbers.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <Link to={`${searchParam}&page=${number}`}>
                    <li
                        key={number}
                        id={number}
                        onClick={handleClick}
                        className={
                            currentPage === number ||
                            (number === 1 && currentPage < 2)
                                ? "active"
                                : null
                        }
                    >
                        {number}
                    </li>
                </Link>
            );
        } else {
            return null;
        }
    });

    const handleNext = () => {
        setCurrentPage(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    const handlePrev = () => {
        setCurrentPage(currentPage - 1);

        if ((currentPage - 1) % pageNumberLimit == 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    let pageIncrement = null;
    if (pageNumbers.length > maxPageNumberLimit) {
        pageIncrement = <li onClick={handleNext}> &hellip; </li>;
    }

    let pageDecrement = null;
    if (minPageNumberLimit >= 1) {
        pageDecrement = <li onClick={handlePrev}> &hellip; </li>;
    }

    return (
        <div>
            <ul className="pageNumbers m-5">
                <Link to={`${searchParam}&page=${page - 1}`}>
                    <li className="prev">
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 1 ? true : false}
                        >
                            Prev
                        </button>
                    </li>
                </Link>

                <Link to={`${searchParam}&page=${page - 1}`}>
                    {pageDecrement}
                </Link>

                {renderPageNumbers}

                <Link to={`${searchParam}&page=${page + 1}`}>
                    {pageIncrement}
                </Link>

                <Link to={`${searchParam}&page=${page + 1}`}>
                    <li className="next">
                        <button
                            onClick={handleNext}
                            disabled={
                                currentPage ==
                                pageNumbers[pageNumbers.length - 1]
                                    ? true
                                    : false
                            }
                        >
                            Next
                        </button>
                    </li>
                </Link>
            </ul>
        </div>
    );
};

export default PaginationComponent;
