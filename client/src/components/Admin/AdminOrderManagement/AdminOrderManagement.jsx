// AdminOrderManagement.jsx
import React, { useState, useEffect } from "react";
import { fetchOrders, updateOrder } from "../../../Api/adminPanel"; // Import API functions
import "./AdminOrderManagement.css";
import { AdminSidebar } from "../AdminSidebar/AdminSidebar";

const AdminOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // Number of orders per page

  useEffect(() => {
    fetchOrderData();
  }, [paymentStatusFilter, statusFilter, page]);

  const fetchOrderData = async () => {
    try {
      const data = await fetchOrders(
        page,
        limit,
        paymentStatusFilter,
        statusFilter
      );
      setOrders(data.orders);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handlePaymentStatusChange = (orderId, newPaymentStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId
          ? { ...order, paymentStatus: newPaymentStatus }
          : order
      )
    );
  };

  const handleUpdateOrder = async (order) => {
    try {
      await updateOrder(order._id, order.paymentStatus, order.status);
      alert("Order updated");
      fetchOrderData(); // Refresh orders after update
    } catch (error) {
      console.error("Failed to update order:", error);
      alert("Failed to update order");
    }
  };

  const handleFilterChange = (e) => {
    setPaymentStatusFilter(e.target.value);
    setPage(1); // Reset to first page when filtering
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1); // Reset to first page when filtering
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-order-container">
        <div className="top-navigation">
          <h1>Admin Order Management</h1>
          <form>
            <label>Payment Status: </label>
            <select value={paymentStatusFilter} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </select>

            <label>Status: </label>
            <select value={statusFilter} onChange={handleStatusFilterChange}>
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </form>
        </div>

        {orders.map((order) => (
          <div key={order._id} className="admin-order-item">
            <div className="details">
              <p>
                <span id="info1">Order Id: </span>
                {order._id}
              </p>
              <p>
                <span id="info1">User email: </span>
                {order.userId.email}
              </p>
              <p>
                <span id="info1">Username: </span>
                {order.userId.name}
              </p>

              <p>
                <span id="info1">Part name: </span>
                {order.partId.name}
              </p>
              <p>
                <span id="info1">Part quantity: </span>
                {order.quantity}
              </p>
              <p>
                <span id="info1">Total Price: </span>
                {order.totalPrice}
              </p>

              <p>
                <span id="info1">Payment Status: </span>
              </p>
              <select
                value={order.paymentStatus}
                onChange={(e) =>
                  handlePaymentStatusChange(order._id, e.target.value)
                }
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
              </select>

              <p>
                <span id="info1">Status: </span>
              </p>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button onClick={() => handleUpdateOrder(order)}>
                Update Order
              </button>
            </div>
          </div>
        ))}

        <div className="pagination">
          {page > 1 && (
            <button onClick={() => setPage(page - 1)}>Previous</button>
          )}
          {page < totalPages && (
            <button onClick={() => setPage(page + 1)}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderManagement;
