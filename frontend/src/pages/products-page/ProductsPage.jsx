import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, searchProducts } from "../../actions/productActions";
import { Preloader } from "../../components/preloader/Preloader";
import Message from "../../components/message/Message";
import ProductCard from "../../components/product-card/Product-card";
import PageNumbers from "../../components/page-numbers/PageNumbers";
import { toggleSidemenu } from "../../actions/pageActions";

function ProductsPage({ history, loc }) {
    const dispatch = useDispatch();
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

    const searchParam = history.location.search;

    let keyword = searchParam.split("=")[0] === "?keyword";

    useEffect(() => {
        if (searchParam.split("=")[0] === "?keyword") {
            dispatch(searchProducts(searchParam));
        } else {
            dispatch(listProducts(searchParam));
        }
    }, [history, dispatch, searchParam]);

    return (
        <Container style={{ marginTop: "70px", minHeight: "90vh" }} fluid>
            <Row className="justify-content-md-center">
                <h2 className="m-5">Latest Products</h2>
            </Row>

            {loading ? (
                <Preloader />
            ) : searchLoading ? (
                <Preloader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : searchError ? (
                <Message variant="danger">{searchError}</Message>
            ) : keyword ? (
                <Row>
                    {searchedProducts.map((product, i) => (
                        <Col key={product.product_id} sm={12} md={6} lg={3}>
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <Row>
                    {products.map((product, i) => (
                        <Col key={product.product_id} sm={12} md={6} lg={3}>
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
            )}
            {keyword ? (
                <PageNumbers
                    page={searchPage}
                    pages={searchPages}
                    keyword={searchParam}
                />
            ) : (
                <PageNumbers
                    page={page}
                    pages={pages}
                    searchParam={searchParam}
                />
            )}
        </Container>
    );
}

export default ProductsPage;
