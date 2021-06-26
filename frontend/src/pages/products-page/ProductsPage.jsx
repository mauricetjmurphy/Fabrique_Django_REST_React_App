import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

import ProductCard from "../../components/product-card/Product-card";

function ProductsPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            //Destructuring the awaited response. Await need to be wrapped in an async function
            const { data } = await axios.get(
                "http://localhost:8000/api/products/"
            );
            setProducts(data);
        }

        fetchProducts();
    }, []);

    return (
        <div>
            <h2 className="text-center p-5">Latest Products</h2>
            <Row>
                {[
                    ...products
                        .reduce(
                            (map, obj) => map.set(obj.product_name, obj),
                            new Map()
                        )
                        .values(),
                ].map((product, i) => (
                    <Col key={product.product_id} sm={12} md={6} lg={4} xl={3}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default ProductsPage;
