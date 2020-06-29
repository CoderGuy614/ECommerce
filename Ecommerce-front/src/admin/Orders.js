import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listOrders } from "./apiAdmin";
import { cloneWith } from "lodash";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    console.log(user._id, token);
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const noOrders = (orders) => {
    return orders.length < 1 ? <h4>No Orders Found</h4> : null;
  };

  return (
    <Layout title="Orders" description={`Hello ${user.name}, View your orders`}>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {JSON.stringify(orders)}
          {noOrders(orders)}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
