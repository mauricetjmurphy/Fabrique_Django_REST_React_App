import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProducts, searchProducts } from "../../actions/productActions";
import Message from "../../components/message/Message";
import ProductCard from "../../components/product-card/Product-card";
import SkeletonCard from "../../components/skeleton/SkeletonCard";
import PaginationComponent from "../../components/pagination-component/PaginationComponent";
import "./products-page.css";
import { login } from "../../actions/userActions";

function ProductsPage({ history, match, sidemenuToggle }) {
    const dispatch = useDispatch();

    const [skeleton, setSkeleton] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const searchParam = history.location.search;
    const category = history.location.search.split("=")[1].split("&")[0];

    // useSelector is used to get specific parts of the state
    const productList = useSelector((state) => state.productList);
    const { error, products, page, pages } = productList;

    // useSelector is used to get specific parts of the state
    const productSearch = useSelector((state) => state.productSearch);
    const {
        error: searchError,
        products: searchedProducts,
        page: searchPage,
        pages: searchPages,
    } = productSearch;

    let keyword = searchParam.split("=")[0] === "?keyword";

    useEffect(() => {
        window.scrollTo(0, 0);

        if (searchParam.split("=")[0] === "?keyword") {
            setSearchTerm(history.location.search.split("=")[1].split("&")[0]);
        } else {
            setSearchTerm(history.location.search.split("=")[1]);
        }
        if (searchParam.split("=")[0] === "?keyword") {
            dispatch(searchProducts(searchParam));
        } else {
            dispatch(listProducts(searchParam));
        }
        const skeletonDisplay = setTimeout(() => {
            setSkeleton(false);
        }, 2000);
        return () => clearTimeout(skeletonDisplay);
    }, [skeleton, history, dispatch, searchParam]);

    return (
        <Container
            style={{ marginTop: "70px", minHeight: "90vh", padding: "0 50px" }}
            fluid
        >
            <Row className="category-filter justify-content-center">
                <Button
                    onClick={sidemenuToggle}
                    style={{
                        background: "#f4f5f7",
                        border: "1px solid #000",
                        color: "#000",
                        margin: "30px 0 0 0",
                        width: "150px",
                        outline: "none",
                    }}
                >
                    Category
                </Button>
            </Row>
            <Row className="justify-content-center">
                <h2 className="m-5">
                    {searchTerm && searchTerm !== "&page"
                        ? category
                        : "All products"}
                </h2>
            </Row>

            {skeleton ? (
                <Row>
                    {products &&
                        products.map((product, i) => (
                            <Col key={i} sm={12} md={6} lg={3}>
                                <SkeletonCard />
                            </Col>
                        ))}
                </Row>
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : searchError ? (
                <Message variant="danger">{searchError}</Message>
            ) : keyword ? (
                <Row>
                    {searchedProducts &&
                        searchedProducts.map((product, i) => (
                            <Col
                                style={{ margin: "0 auto 30px auto" }}
                                key={product.product_id}
                                sm={12}
                                md={6}
                                lg={3}
                            >
                                <ProductCard product={product} />
                            </Col>
                        ))}
                </Row>
            ) : (
                <Row>
                    {products.map((product, i) => (
                        <Col
                            className="justify-content-center"
                            style={{ marginBottom: "30px" }}
                            key={product.product_id}
                            sm={12}
                            md={6}
                            lg={3}
                        >
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
            )}

            {keyword ? (
                <PaginationComponent page={searchPage} pages={searchPages} />
            ) : (
                <PaginationComponent page={page} pages={pages} />
            )}
        </Container>
    );
}

export default ProductsPage;
