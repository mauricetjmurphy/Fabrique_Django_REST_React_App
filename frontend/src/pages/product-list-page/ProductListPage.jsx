import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Table, Button, Row, Container, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    listProducts,
    deleteProducts,
    deleteProduct,
    uploadProduct,
} from "../../actions/productActions";
import Message from "../../components/message/Message";
import { Preloader } from "../../components/preloader/Preloader";
import PaginationComponent from "../../components/pagination-component/PaginationComponent";
import { PRODUCT_UPLOAD_RESET } from "../../constants/productConstants";

function ProductListPage({ match }) {
    const dispatch = useDispatch();
    let history = useHistory();

    const [product_name, setProduct_name] = useState("");
    const [availability, setAvailability] = useState("");
    const [product_category, setProduct_category] = useState("");
    const [brand, setBrand] = useState("");
    const [color, setColor] = useState("");
    const [description, setDescription] = useState("");
    const [gender, setGender] = useState("");
    const [size, setSize] = useState("");
    const [material, setMaterial] = useState("");
    const [retail_price, setRetail_price] = useState("");
    const [product_image_url, setProduct_image_url] = useState("");
    const [additional_image_link, setAdditional_image_link] = useState("");

    const searchParam = history.location.search;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    const productDelete = useSelector((state) => state.productDelete);
    const { success: successDelete } = productDelete;

    const productUpload = useSelector((state) => state.productUpload);
    const {
        loading: loadingUpload,
        error: errorUpload,
        success: successUpload,
    } = productUpload;

    useEffect(() => {
        dispatch({ type: PRODUCT_UPLOAD_RESET });
        // ---------Insert Modal to check if the action is intended-------//
        dispatch(listProducts(searchParam));
    }, [dispatch, userInfo, history, successDelete, searchParam]);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };

    const deleteProductsHandler = (id) => {
        dispatch(deleteProducts(id));
    };

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(
            uploadProduct({
                product_name,
                availability,
                product_category,
                brand,
                color,
                description,
                gender,
                size,
                material,
                retail_price,
                product_image_url,
                additional_image_link,
            })
        );
        dispatch(listProducts(searchParam));

        setProduct_name("");
        setAvailability("");
        setProduct_category("");
        setBrand("");
        setColor("");
        setDescription("");
        setGender("");
        setSize("");
        setMaterial("");
        setRetail_price("");
        setProduct_image_url("");
        setAdditional_image_link("");
    };

    return (
        <Container style={{ marginTop: "70px", minHeight: "90vh" }}>
            <Row className="justify-content-center m-3">
                <h1>Upload Product</h1>
            </Row>

            <Row className="justify-content-center">
                <Col lg={6}>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="product_name">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={product_name}
                                onChange={(e) =>
                                    setProduct_name(e.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="availability">
                            <Form.Label>Availability</Form.Label>
                            <Form.Control
                                type="textarea"
                                value={availability}
                                onChange={(e) =>
                                    setAvailability(e.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="product_category"
                        >
                            <Form.Label>Product Category</Form.Label>
                            <Form.Control
                                type="textarea"
                                value={product_category}
                                onChange={(e) =>
                                    setProduct_category(e.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="brand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="textarea"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="color">
                            <Form.Label>Color</Form.Label>
                            <Form.Control
                                type="textarea"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="textarea"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="gender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                                type="textarea"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="size">
                            <Form.Label>Size</Form.Label>
                            <Form.Control
                                type="textarea"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="material">
                            <Form.Label>Material</Form.Label>
                            <Form.Control
                                type="textarea"
                                value=""
                                onChange={(e) =>
                                    setAvailability(e.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="retail_price">
                            <Form.Label>Retail Price</Form.Label>
                            <Form.Control
                                type="textarea"
                                value={retail_price}
                                onChange={(e) =>
                                    setRetail_price(e.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="product_url">
                            <Form.Label>Product Url</Form.Label>
                            <Form.Control
                                type="textarea"
                                value={material}
                                onChange={(e) => setMaterial(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="product_image_url"
                        >
                            <Form.Label>Product Image Url</Form.Label>
                            <Form.Control
                                type="textarea"
                                value={product_image_url}
                                onChange={(e) =>
                                    setProduct_image_url(e.target.value)
                                }
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="additional_image_link"
                        >
                            <Form.Label>Additional Image Link</Form.Label>
                            <Form.Control
                                type="textarea"
                                value={additional_image_link}
                                onChange={(e) =>
                                    setAdditional_image_link(e.target.value)
                                }
                            />
                        </Form.Group>

                        <Button
                            className="mb-2 btn-block"
                            variant="dark"
                            type="submit"
                        >
                            Upload
                        </Button>
                    </Form>
                </Col>
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
                            <th></th>
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
                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() =>
                                            deleteProductHandler(
                                                product.product_id
                                            )
                                        }
                                    >
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
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
