import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart, removeItem } from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            product={product}
            key={i}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            run={run}
            setRun={setRun}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br />
      <Link to="/shop">Continue Shopping</Link>{" "}
    </h2>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items..."
      className="container-fluid"
    >
      {}
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <h2 className="mb-4">Your Cart Summary</h2>
          <hr />
          <Checkout products={items} run={run} setRun={setRun} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
