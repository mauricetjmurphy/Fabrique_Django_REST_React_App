import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Table, Button, Row, Container, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, deleteProducts } from "../../actions/productActions";
import Message from "../../components/message/Message";
import { Preloader } from "../../components/preloader/Preloader";
import PaginationComponent from "../../components/pagination-component/PaginationComponent";
import FileDrop from "../../components/file-drop/FileDrop";

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

    const handleDelete = () => {
        dispatch(deleteProducts());
    };

    return (
        <Container style={{ marginTop: "70px", minHeight: "90vh" }}>
            <Row className="justify-content-center m-5">
                <h1>Manage Products</h1>
            </Row>

            <Row
                style={{ width: "30%", margin: "50px auto" }}
                className="flex-column justify-content-center"
            >
                <h2 className="text-center">Delete All Products</h2>
                <Button
                    style={{ fontSize: "14px", display: "block" }}
                    onClick={handleDelete}
                    variant="danger"
                >
                    Delete
                </Button>
            </Row>

            <Row className="justify-content-center">
                <h2>Upload products CSV to database</h2>
                <FileDrop />
            </Row>

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
            <PaginationComponent page={page} pages={pages} />
        </Container>
    );
}

export default ProductListPage;
