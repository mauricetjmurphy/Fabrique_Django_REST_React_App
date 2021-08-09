import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Pagination } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import "./page-numbers.css";

function PageNumbers({ pages, page, searchParam, isAdmin = false }) {
    const history = useHistory();

    if (searchParam) {
        searchParam = searchParam.split("&")[0];
    }
    const keyword = history.location.search.split("&")[0];

    return pages > 2 && searchParam ? (
        <Pagination className="m-5 justify-content-md-center">
            {[...Array(pages).keys()].map((x, i) => (
                <LinkContainer key={i} to={`${searchParam}&page=${x + 1}`}>
                    <Pagination.Item active={x + 1 === page}>
                        {x + 1}
                    </Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    ) : (
        <Pagination className="m-5 justify-content-md-center">
            {[...Array(pages).keys()].map((x, i) => (
                <LinkContainer key={i} to={`${keyword}&page=${x + 1}`}>
                    <Pagination.Item active={x + 1 === page}>
                        {x + 1}
                    </Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    );
}

export default PageNumbers;
