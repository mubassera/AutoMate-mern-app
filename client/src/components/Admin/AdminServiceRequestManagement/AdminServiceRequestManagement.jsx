import React, { useState, useEffect } from "react";
import axios from "axios";
import { AdminSidebar } from "../AdminSidebar/AdminSidebar"; // Import the unchanged sidebar
import "./AdminServiceRequestManagement.css"; // Import the updated CSS

function AdminServiceRequestManagement() {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState({});

  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/service-requests"
        );
        setServiceRequests(response.data);
      } catch (error) {
        console.error("Error fetching service requests:", error);
      }
    };

    fetchServiceRequests();
  }, []);

  const handleStatusChange = (id, status) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [id]: status,
    }));
  };

  const handlePaymentStatusChange = (id, paymentStatus) => {
    setSelectedPaymentStatus((prevPaymentStatus) => ({
      ...prevPaymentStatus,
      [id]: paymentStatus,
    }));
  };

  const updateStatus = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/admin/update-service-status/${id}`,
        { status: selectedStatus[id], paymentStatus: selectedPaymentStatus[id] }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating service status:", error);
    }
  };

  return (
    <div className="asrm-container">
      <AdminSidebar />
      <div className="asrm-content">
        <h1 className="asrm-title">Service Request Management</h1>
        <table className="asrm-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Selected Services</th>
              <th>Total Cost</th>
              <th>Comments</th>
              <th>Status</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {serviceRequests.map((request) => (
              <tr key={request._id}>
                <td>{request.customerName}</td>
                <td>
                  <ul>
                    {request.selectedServices.map((service, index) => (
                      <li key={index}>
                        {service.name} - ${service.cost}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>${request.totalCost}</td>
                <td>{request.comments}</td>
                <td>
                  <select
                    value={selectedStatus[request._id] || request.status}
                    onChange={(e) =>
                      handleStatusChange(request._id, e.target.value)
                    }
                    className="asrm-select"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Completed">Completed</option>
                    <option value="Declined">Declined</option>
                  </select>
                </td>
                <td>
                  <select
                    value={
                      selectedPaymentStatus[request._id] || request.paymentStatus
                    }
                    onChange={(e) =>
                      handlePaymentStatusChange(request._id, e.target.value)
                    }
                    className="asrm-select"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => updateStatus(request._id)}
                    className="asrm-button"
                  >
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminServiceRequestManagement;
