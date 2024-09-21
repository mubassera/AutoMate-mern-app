import React, { useState, useEffect } from "react";
import {
  fetchServiceRequestsApi,
  updateServiceRequestStatusApi,
} from "../../../Api/adminPanel";
import "./AdminServiceRequestManagement.css";
import { AdminSidebar } from "../AdminSidebar/AdminSidebar";

function AdminServiceRequestManagement() {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [selectedStatusForSearch, setSelectedStatusForSearch] = useState("");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState({});
  const [selectedPaymentStatusForSearch, setSelectedPaymentStatusForSearch] =
    useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchServiceRequests();
  }, [page]);

  const fetchServiceRequests = async () => {
    const params = {
      ...(selectedStatusForSearch && { status: selectedStatusForSearch }),
      ...(selectedPaymentStatusForSearch && {
        paymentStatus: selectedPaymentStatusForSearch,
      }),
      page,
      limit,
    };

    try {
      const data = await fetchServiceRequestsApi(params);
      setServiceRequests(data.serviceRequests);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };

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
      const response = await updateServiceRequestStatusApi(
        id,
        selectedStatus[id],
        selectedPaymentStatus[id]
      );
      alert(response.message);
    } catch (error) {
      console.error("Error updating service status:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchServiceRequests();
  };

  return (
    <div>
      <AdminSidebar />
      <div className="asrm-container">
        <div className="top-navigation">
          <h1>Service Request Management</h1>
          <form onSubmit={handleSearch}>
            <div>
              <label>Status: </label>
              <select
                value={selectedStatusForSearch}
                onChange={(e) => setSelectedStatusForSearch(e.target.value)}
                className="asrm-select"
              >
                <option value="">Select Request Status</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Completed">Completed</option>
                <option value="Declined">Declined</option>
              </select>
            </div>
            <div>
              <label>Payment Status: </label>
              <select
                value={selectedPaymentStatusForSearch}
                onChange={(e) =>
                  setSelectedPaymentStatusForSearch(e.target.value)
                }
                className="asrm-select"
              >
                <option value="">Select Payment Status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>
            <button type="submit">Search</button>
          </form>
        </div>

        <div className="asrm-content">
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
                      {request.selectedServices.map((service) => (
                        <li key={service.serviceId}>
                          {service.serviceName} - {service.price} BDT
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{request.totalCost} BDT</td>
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
                        selectedPaymentStatus[request._id] ||
                        request.paymentStatus
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
                    <button onClick={() => updateStatus(request._id)}>
                      Update Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </button>
            {/* <span>
              Page {page} of {totalPages}
            </span> */}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminServiceRequestManagement;
