import React from "react";
import { Row, Col } from "react-bootstrap";

import ProductCard from "../../components/product-card/Product-card";

import products from "../../products";

function ProductsPage() {
    return (
        <div>
            <h2 className="text-center">Latest Products</h2>
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
