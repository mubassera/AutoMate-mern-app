// OrderHistory.jsx
import React, { useState, useEffect } from "react";
import { fetchOrderHistory } from "../../Api/userPanel"; // Import the new API function
import Navbar from "../navbar/navbar";
import "./OrderHistory.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("userData"))._id;
        const ordersData = await fetchOrderHistory(userId);
        setOrders(ordersData);
      } catch (error) {
        console.log("Error fetching history", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-history-page">
      <Navbar />
      <div className="order-history-container">
        <h2>Your Orders</h2>
        <ul className="order-history-list">
          {orders.map((order, index) => (
            <li key={index} className="order-card">
              <img
                src={order.partId.image}
                alt={order.partId.name}
                className="part-image"
              />
              <div className="order-details">
                <p>
                  <span>Part Name:</span> {order.partId.name}
                </p>
                <p>
                  <span>Quantity:</span> {order.quantity} units
                </p>
                <p>
                  <span>Total Price:</span> ${order.totalPrice}
                </p>
                <p>
                  <span>Status:</span> {order.status}
                </p>
                <p>
                  <span>Payment Status:</span> {order.paymentStatus}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderHistory;
