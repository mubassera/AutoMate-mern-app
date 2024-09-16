import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/SearchItems/SearchItems.css";
import Navbar from "./navbar/navbar.jsx";
import { fetchAllPartsForUser } from "../Api/userPanel.js";
import { logoutUser } from "../Api/auth.js";

const SearchParts = () => {
  const [name, setName] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [isAvailable, setIsAvailable] = useState("");
  const [parts, setParts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    searchParts();
  }, [page]);

  const searchParts = async () => {
    try {
      const params = {
        name: name || undefined,
        vehicleType: vehicleType || undefined,
        vehicleBrand: vehicleBrand || undefined,
        isAvailable: isAvailable || undefined,
        page,
        limit,
      };

      const data = await fetchAllPartsForUser(params);

      // Update state with fetched parts
      setParts(data.parts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    searchParts();
  };

  const handleCardClick = (part) => {
    navigate(`/parts/${part._id}`, { state: { part } }); // Navigate to the details page
  };
  const handlePartPurchase = (part) => {
    navigate(`/PurchasePart`, { state: { part } }); // Navigate to the details page
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="Items">
      <Navbar />

      <div className="searchItemContents">
        <div className="sidebar">
          <h1>Search Items</h1>
          <form onSubmit={handleSearch}>
            <div>
              <label>Name: </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label>Vehicle Type: </label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="">Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="truck">Truck</option>
              </select>
            </div>

            <div>
              <label>Vehicle Brand: </label>
              <select
                value={vehicleBrand}
                onChange={(e) => setVehicleBrand(e.target.value)}
              >
                <option value="">Select Vehicle Brand</option>
                <option value="toyota">Toyota</option>
                <option value="honda">Honda</option>
                <option value="bmw">BMW</option>
              </select>
            </div>

            <div>
              <label>Availability: </label>
              <select
                value={isAvailable}
                onChange={(e) => setIsAvailable(e.target.value)}
              >
                <option value="">Select Availability</option>
                <option value="Yes">Available</option>
                <option value="No">Unavailable</option>
              </select>
            </div>

            <button type="submit">Search</button>
          </form>
        </div>

        <div className="results">
          <h2>Results</h2>

          <div className="cards-container">
            {parts && parts.length > 0 ? (
              parts.map((part) => (
                <div
                  key={part._id}
                  className="card"
                  onClick={() => handleCardClick(part)}
                >
                  <img
                    src={part.image}
                    alt={part.name}
                    className="part-image-small"
                  />
                  <div className="texts">
                    <h3>{part.name}</h3>
                    <p>Price: ${part.price}</p>
                    <p>Type: {part.vehicleType}</p>
                    <p>Brand: {part.vehicleBrand}</p>

                    <p>
                      Availability:{" "}
                      {part.isAvailable === "Yes" ? "Available" : "Unavailable"}
                    </p>
                    <p>{part.shortDescription}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePartPurchase(part);
                    }}
                  >
                    Buy
                  </button>
                </div>
              ))
            ) : (
              <p>No parts found.</p>
            )}
          </div>

          <div>
            {page > 1 && (
              <button onClick={() => handlePageChange(page - 1)}>
                Previous
              </button>
            )}
            {page < totalPages && (
              <button onClick={() => handlePageChange(page + 1)}>Next</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchParts;
