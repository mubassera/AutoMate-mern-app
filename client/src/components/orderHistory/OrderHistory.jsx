import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../Api/auth";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = getToken();
        const config = {
          headers: {
            Authorization: "Bearer " + token,
          },
        };

        const userId = JSON.parse(localStorage.getItem("userData"))._id;
        const response = await axios.get(
          `http://localhost:5000/order/history?userId=${userId}`,
          config
        );
        setOrders(response.data);
      } catch (error) {
        console.log("error fetching history", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2 style={{ color: "black" }}>Your Orders</h2>
      <ul>
        {orders.map((order, index) => (
          <p key={index} style={{ color: "black" }}>
            part name: {order.partId.name} - quantity: {order.quantity} units -
            total price: ${order.totalPrice} - Status: {order.status} - Payment
            Status: {order.paymentStatus}
          </p>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
