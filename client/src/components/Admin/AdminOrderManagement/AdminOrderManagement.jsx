import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../../Api/auth";

const AdminOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState("Pending");

  useEffect(() => {
    const fetchOrders = async () => {
      const token = getToken();
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const response = await axios.get(
        "http://localhost:5000/admin/orders",
        config
      );
      setOrders(response.data);
    };

    fetchOrders();
  }, []);

  const handleUpdatePaymentStatus = async (order) => {
    try {
      const token = getToken();
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      await axios.post(
        "http://localhost:5000/admin/update-payment",
        { orderId: order._id, paymentStatus: order.paymentStatus },
        config
      );

      alert("Payment status updated");
    } catch (error) {
      alert("Failed to update payment status");
    }
  };

  const handlePaymentStatusChange = (order, e) => {
    const updatedOrders = orders.map((o) =>
      o._id === order._id ? { ...o, paymentStatus: e.target.value } : o
    );
    setOrders(updatedOrders);
  };

  return (
    <div>
      <h2 style={{ color: "black" }}>Admin Order Management</h2>

      {orders.map((order) => (
        <div key={order._id}>
          <p style={{ color: "black" }}>
            orderId={order._id} partId={order.partId} totalPrice=
            {order.totalPrice} paymentStatus={order.paymentStatus}
          </p>
          <select
            value={order.paymentStatus}
            onChange={(e) => handlePaymentStatusChange(order, e)}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
          </select>
          <button onClick={() => handleUpdatePaymentStatus(order)}>
            Update Payment Status
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminOrderManagement;
