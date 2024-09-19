import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminParts.css";
import { AdminSidebar } from "../AdminSidebar/AdminSidebar";
import { fetchAllParts, deletePart } from "../../../Api/adminPanel";

export const AdminParts = () => {
  const navigate = useNavigate();

  const [parts, setParts] = useState([]);
  const [filteredParts, setFilteredParts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [isAvailable, setIsAvailable] = useState("");

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    try {
      const data = await fetchAllParts();
      setParts(data);
      setFilteredParts(data); // Initialize filteredParts with all parts
    } catch (error) {
      console.error("Error fetching parts:", error);
    }
  };

  const handleSearch = () => {
    const filtered = parts.filter((part) => {
      // Filter by search query (name of part)
      const matchesSearchQuery = part.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Filter by vehicle type
      const matchesVehicleType = vehicleType
        ? part.vehicleType === vehicleType
        : true;

      // Filter by vehicle brand
      const matchesVehicleBrand = vehicleBrand
        ? part.vehicleBrand === vehicleBrand
        : true;

      // Filter by availability
      const matchesAvailability = isAvailable
        ? part.isAvailable.toLowerCase() === isAvailable.toLowerCase()
        : true;

      // Return true if all conditions match
      return (
        matchesSearchQuery &&
        matchesVehicleType &&
        matchesVehicleBrand &&
        matchesAvailability
      );
    });

    setFilteredParts(filtered);
  };

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
        setFilteredParts(prevParts); // Also update the filtered parts
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
            value={isAvailable}
            onChange={(e) => setIsAvailable(e.target.value)}
          >
            <option value="">Select Availability</option>
            <option value="Yes">Available</option>
            <option value="No">Unavailable</option>
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="parts-list">
          {filteredParts.length > 0 ? (
            filteredParts.map((part) => (
              <div key={part._id} className="part-box">
                <img src={part.image} alt={part.name} />
                <div className="content">
                  <h3>{part.name}</h3>
                  <p>Vehicle Type: {part.vehicleType}</p>
                  <p>Brand: {part.vehicleBrand}</p>
                  <p>Price: ${part.price}</p>
                  <p>Available: {part.isAvailable}</p>
                  <p>{part.shortDescription}</p>
                </div>
                <div className="buttons">
                  <button onClick={() => handleEdit(part)} className="edit-button">Edit</button>
                  <button onClick={() => handleDelete(part._id)} className="delete-button">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No parts found</p>
          )}
        </div>

        <div className="add-part-button">
          <button onClick={() => navigate("/adminParts/details")}>
            AddPart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminParts;
