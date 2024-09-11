import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminParts.css';
import { AdminSidebar } from '../AdminSidebar/AdminSidebar';
import { PartsContext } from '../PartsContext';

export const AdminParts = () => {
  const navigate = useNavigate();
  const { parts, setParts } = useContext(PartsContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [brand, setBrand] = useState('');
  const [availability, setAvailability] = useState('');

  const handleSearch = () => {
    console.log('Search for:', searchQuery, vehicleType, brand, availability);
  };

  const handleEdit = (part) => {
    navigate('/adminParts/details', { state: { part } });
  };

  const handleDelete = (id) => {
    // Confirm before deleting
    if (window.confirm('Are you sure you want to delete this part?')) {
      setParts((prevParts) => prevParts.filter((part) => part.id !== id));
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
          <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
            <option value="">Select Vehicle Type</option>
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="truck">Truck</option>
          </select>
          <select value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="">Select Brand</option>
            <option value="toyota">Toyota</option>
            <option value="honda">Honda</option>
            <option value="bmw">BMW</option>
          </select>
          <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
            <option value="">Select Availability</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="parts-list">
          {parts.map((part) => (
            <div key={part.id} className="part-box">
              <img src={part.image} alt={part.partName} />
              <h3>{part.partName}</h3>
              <p>Price: ${part.price}</p>
              <p>Available: {part.availability === 'available' ? 'Yes' : 'No'}</p>
              <p>{part.shortDescription}</p>
              <button onClick={() => handleEdit(part)}>Edit</button>
              <button onClick={() => handleDelete(part.id)} className="delete-button">Delete</button>
            </div>
          ))}
        </div>

        <div className="add-part-button">
          <button onClick={() => navigate('/adminParts/details')}>Add Part</button>
        </div>
      </div>
    </div>
  );
};

export default AdminParts;
