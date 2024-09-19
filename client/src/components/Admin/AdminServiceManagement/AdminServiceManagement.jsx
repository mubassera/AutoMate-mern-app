import React, { useState, useEffect } from "react";
import axios from "axios";
import './AdminServiceManagement.css'; // Import the CSS file
import { AdminSidebar } from "../AdminSidebar/AdminSidebar"; // Import the AdminSidebar component

function AdminServiceManagement() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: "",
    vehicleType: "Car",
    cost: 0,
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/all-services");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleServiceCostChange = (id, cost) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service._id === id ? { ...service, cost: cost } : service
      )
    );
  };

  const updateServiceCost = async (id) => {
    try {
      const serviceToUpdate = services.find((service) => service._id === id);
      await axios.put(`http://localhost:5000/admin/services/${id}`, {
        cost: serviceToUpdate.cost,
      });
      alert("Service cost updated");
    } catch (error) {
      console.error("Error updating service cost:", error);
    }
  };

  const addNewService = async () => {
    try {
      await axios.post("http://localhost:5000/admin/new-service", newService);
      setNewService({ name: "", vehicleType: "Car", cost: 0 });
      alert("New service added");
      const response = await axios.get("http://localhost:5000/admin/services");
      setServices(response.data);
    } catch (error) {
      console.error("Error adding new service:", error);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-service-container">
        {/* <h1>Manage Services</h1> */}

        <h1>Existing Services</h1>
        <table className="service-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                <td>{service.name}</td>
                <td>{service.type}</td>
                <td>
                  <input
                    type="number"
                    value={service.cost}
                    onChange={(e) =>
                      handleServiceCostChange(service._id, e.target.value)
                    }
                  />
                </td>
                <td>
                  <button onClick={() => updateServiceCost(service._id)}>
                    Update Cost
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Add New Service</h2>
        <div className="new-service-form">
          <label>
            Name:
            <input
              type="text"
              value={newService.name}
              onChange={(e) =>
                setNewService({ ...newService, name: e.target.value })
              }
            />
          </label>
          <label>
            Type:
            <select
              value={newService.vehicleType}
              onChange={(e) =>
                setNewService({ ...newService, vehicleType: e.target.value })
              }
            >
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
            </select>
          </label>
          <label>
            Cost:
            <input
              type="number"
              value={newService.cost}
              onChange={(e) =>
                setNewService({ ...newService, cost: e.target.value })
              }
            />
          </label>
          <button onClick={addNewService}>Add Service</button>
        </div>
      </div>
    </div>
  );
}

export default AdminServiceManagement;
