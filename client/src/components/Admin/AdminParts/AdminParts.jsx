import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminParts.css";
import { AdminSidebar } from "../AdminSidebar/AdminSidebar";
import { PartsContext } from "../PartsContext";
import { deletePart, fetchAllParts } from "../../../Api/adminPanel";

export const AdminParts = () => {
  const navigate = useNavigate();
  //const { parts, setParts } = useContext(PartsContext);

  const [parts, setParts] = useState([]);
  const [filteredParts, setFilteredParts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [isAvailabile, setIsAvailabile] = useState("");

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    try {
      const data = await fetchAllParts();
      setParts(data);
    } catch (error) {
      console.error("Error fetching parts:", error);
    }
  };

  ///Incomplete
  const handleSearch = () => {
    console.log("Search for:", searchQuery, vehicleType, brand, availability);
  };
  //to this point

  const handleEdit = (part) => {
    navigate("/adminParts/details", { state: { part } });
  };

  const handleDelete = async (id) => {
    // Confirm before deleting
    if (window.confirm("Are you sure you want to delete this part?")) {
      try {
        await deletePart(id);
        const prevParts = parts.filter((part) => part._id !== id);
        setParts(prevParts);
      } catch (error) {
        console.error("Error deleting part:", error);
      }
    }
  };

  return (
    <div className="admin-parts">
      <AdminSidebar />
      <div className="adminPartsContents">
        <h1>Parts</h1>

        <div className="search-filters">
          <input
            type="text"
            placeholder="Search by vehicle name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="">Select Vehicle Type</option>
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="truck">Truck</option>
          </select>
          <select
            value={vehicleBrand}
            onChange={(e) => setVehicleBrand(e.target.value)}
          >
            <option value="">Select Brand</option>
            <option value="toyota">Toyota</option>
            <option value="honda">Honda</option>
            <option value="bmw">BMW</option>
          </select>
          <select
            value={isAvailabile}
            onChange={(e) => setIsAvailabile(e.target.value)}
          >
            <option value="">Select Availability</option>
            <option value="Yes">Available</option>
            <option value="No">Unavailable</option>
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="parts-list">
          {parts.map((part) => (
            <div key={part._id} className="part-box">
              <img src={part.image} alt={part.name} />
              <h3>{part.name}</h3>
              <p>Vehicle Type: {part.vehicleType}</p>
              <p>Brand: {part.vehicleBrand}</p>
              <p>Price: ${part.price}</p>
              <p>Available: {part.isAvailable}</p>
              <p>{part.shortDescription}</p>
              <button onClick={() => handleEdit(part)}>Edit</button>
              <button
                onClick={() => handleDelete(part._id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className="add-part-button">
          <button onClick={() => navigate("/adminParts/details")}>
            Add Part
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminParts;
