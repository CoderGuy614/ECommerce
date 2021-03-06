import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "../core/apiCore";
import Card from "./Card";
import Search from "./Search";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelated(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <Search />
      <h2 className="mb-4">Product Details</h2>
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
        <div className="col-4 apple">
          <h4>Related Products</h4>
          {related.map((product, i) => (
            <div key={i} className="mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
