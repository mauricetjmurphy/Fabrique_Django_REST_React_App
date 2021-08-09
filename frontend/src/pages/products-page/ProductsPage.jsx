import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, searchProducts } from "../../actions/productActions";
import { Preloader } from "../../components/preloader/Preloader";
import Message from "../../components/message/Message";
import ProductCard from "../../components/product-card/Product-card";
import PageNumbers from "../../components/page-numbers/PageNumbers";
import { toggleSidemenu } from "../../actions/pageActions";
import SkeletonCard from "../../components/skeleton/SkeletonCard";
import "./products-page.css";

function ProductsPage({ history, match }) {
    const dispatch = useDispatch();
    // useSelector is used to get specific parts of the state
    const productList = useSelector((state) => state.productList);
    const { error, loading, products, page, pages } = productList;

    const [skeleton, setSkeleton] = useState(true);

    // useSelector is used to get specific parts of the state
    const productSearch = useSelector((state) => state.productSearch);
    const {
        error: searchError,
        loading: searchLoading,
        products: searchedProducts,
        page: searchPage,
        pages: searchPages,
    } = productSearch;

    const searchParam = history.location.search.split("&")[0];

    console.log(skeleton);

    let keyword = searchParam.split("=")[0] === "?keyword";

    useEffect(() => {
        if (searchParam.split("=")[0] === "?keyword") {
            dispatch(searchProducts(searchParam));
        } else {
            dispatch(listProducts(searchParam));
        }
        const skeletonDisplay = setTimeout(() => {
            setSkeleton(false);
        }, 1000);
        return () => clearTimeout(skeletonDisplay);
    }, [skeleton, history, dispatch, searchParam]);

    return (
        <Container style={{ marginTop: "70px", minHeight: "90vh" }} fluid>
            <Row className="justify-content-md-center">
                <h2 className="m-5">Latest Products</h2>
            </Row>

            {skeleton || loading || searchLoading ? (
                <Row>
                    {products.map((product, i) => (
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
                    {searchedProducts.map((product, i) => (
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
