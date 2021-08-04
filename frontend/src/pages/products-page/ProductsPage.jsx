import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import { Preloader } from "../../components/preloader/Preloader";
import Message from "../../components/message/Message";
import ProductCard from "../../components/product-card/Product-card";

function ProductsPage() {
    const dispatch = useDispatch();
    // useSelector is used to get specific parts of the state
    const productList = useSelector((state) => state.productList);
    const { error, loading, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <Container fluid>
            <Row className="justify-content-md-center">
                <h2>Latest Products</h2>
            </Row>

            {loading ? (
                <Preloader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Row>
                    {/* Only show the unique products */}
                    {[
                        ...products
                            .reduce(
                                (map, obj) => map.set(obj.product_name, obj),
                                new Map()
                            )
                            .values(),
                    ].map((product, i) => (
                        <Col key={product.product_id} sm={12} md={6} lg={3}>
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default ProductsPage;
