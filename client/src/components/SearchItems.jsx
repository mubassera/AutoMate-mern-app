import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../components/SearchItems/SearchItems.css';
import Navbar from './navbar/navbar.jsx';

const SearchParts = () => {
  const [name, setName] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [availability, setAvailability] = useState(""); 
  const [parts, setParts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate(); // Use navigate to move to the details page

  useEffect(() => {
    searchParts();
  }, [page]);

  const searchParts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/parts", {
        params: {
          name: name || undefined,
          vehicleType: vehicleType || undefined,
          vehicleBrand: vehicleBrand || undefined,
          vehicleModel: vehicleModel || undefined,
          availability: availability || undefined,
          page,
          limit,
        },
      });
      setParts(response.data.parts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    searchParts();
  };

  const handleCardClick = (partId) => {
    navigate(`/parts/${partId}`); // Navigate to the details page
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
              <label>Model: </label>
              <input
                type="text"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
              />
            </div>

            <div>
              <label>Availability: </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              >
                <option value="">Select Availability</option>
                <option value="available">Available</option>
                <option value="not-available">Not Available</option>
              </select>
            </div>

            <button type="submit">Search</button>
          </form>
        </div>

        <div className="results">
          <h2>Results</h2>

          <div className="cards-container">
            {parts.map((part) => (
              <div
                key={part._id}
                className="card"
                onClick={() => handleCardClick(part._id)}
              >
                <img src={part.imageUrl} alt={part.name} className="part-image" />
                <div className="texts">
                <h3>{part.name}</h3>
                <p>Price: ${part.price}</p>
                <p>Availability: {part.availability ? "Available" : "Not Available"}</p>
                <p>{part.description}</p>
                </div>
                <button>Buy</button>
              </div>
            ))}
          </div>

          <div>
            {page > 1 && (
              <button onClick={() => handlePageChange(page - 1)}>Previous</button>
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
