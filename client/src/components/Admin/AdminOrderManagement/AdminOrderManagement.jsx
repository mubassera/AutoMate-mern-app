import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../../Api/auth";
import './AdminOrderManagement.css';
import { AdminSidebar } from "../AdminSidebar/AdminSidebar"; // Import the AdminSidebar component

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
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-order-container">
        <h1>Admin Order Management</h1>

        {orders.map((order) => (
          <div key={order._id} className="admin-order-item">
            <img src={order.partImage} alt={`Part ${order.partId}`} />
            <div className="details">
              <p><span id="info1">Order Id: </span>{order._id}</p>
              <p><span id="info1">Part Id: </span>{order.partId}</p>
              <p><span id="info1">Total Price: </span>{order.totalPrice}</p>
              <p><span id="info1">Payment Status: </span>{order.paymentStatus}</p>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrderManagement;
