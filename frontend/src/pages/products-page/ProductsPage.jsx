import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, searchProducts } from "../../actions/productActions";
import Message from "../../components/message/Message";
import ProductCard from "../../components/product-card/Product-card";
import SkeletonCard from "../../components/skeleton/SkeletonCard";
import PaginationComponent from "../../components/pagination-component/PaginationComponent";
import "./products-page.css";

function ProductsPage({ history, match }) {
    const dispatch = useDispatch();
    const [category, setCategory] = useState();
    const [skeleton, setSkeleton] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    // const [searchParam, setSearchParam] = useState("");

    const searchParam = history.location.search;

    // useSelector is used to get specific parts of the state
    const productList = useSelector((state) => state.productList);
    const { error, loading, products, page, pages } = productList;

    // useSelector is used to get specific parts of the state
    const productSearch = useSelector((state) => state.productSearch);
    const {
        error: searchError,
        loading: searchLoading,
        products: searchedProducts,
        page: searchPage,
        pages: searchPages,
    } = productSearch;

    let keyword = searchParam.split("=")[0] === "?keyword";

    useEffect(() => {
        window.scrollTo(0, 0);
        if (category) {
            setCategory(history.location.search.split("=")[1].split("&")[0]);
        }
        // if (searchParam) {
        //     setSearchParam(history.location.search);
        // }
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
            <Row className="justify-content-md-center">
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
            ) : (
                <Row>
                    {products.map((product, i) => (
                        <Col
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
