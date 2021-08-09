import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Container, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import Message from "../../components/message/Message";
import { Preloader } from "../../components/preloader/Preloader";
import PageNumbers from "../../components/page-numbers/PageNumbers";

function ProductListPage({ match }) {
    const dispatch = useDispatch();
    let history = useHistory();

    const searchParam = history.location.search;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    const userDelete = useSelector((state) => state.userDelete);
    const { success: successDelete } = userDelete;

    useEffect(() => {
        // ---------Insert Modal to check if the action is intended-------//
        dispatch(listProducts(searchParam));
    }, [dispatch, userInfo, history, successDelete, searchParam]);

    return (
        <Container style={{ marginTop: "70px", minHeight: "90vh" }}>
            <Row className="justify-content-md-center">
                <h1 className="text-center m-5">Products</h1>
            </Row>

            {loading ? (
                <Preloader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td>{product.product_id}</td>
                                <td>{product.product_name}</td>
                                <td>{product.retail_price}</td>
                                <td>{product.product_category}</td>
                                <td>{product.brand}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            <PageNumbers page={page} pages={pages} keyword={searchParam} />
        </Container>
    );
}

export default ProductListPage;
