import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
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
        <div>
            <h2 className="text-center p-5">Latest Products</h2>
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
                        <Col
                            key={product.product_id}
                            sm={12}
                            md={6}
                            lg={4}
                            xl={3}
                        >
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}

export default ProductsPage;
