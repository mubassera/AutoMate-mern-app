import React, { useState, useContext, useEffect } from 'react';
import './AdminPartDetails.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { PartsContext } from '../PartsContext';

export const AdminPartDetails = () => {
  const { addPart, parts, setParts } = useContext(PartsContext);
  const [partName, setPartName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [price, setPrice] = useState('');
  const [availability, setAvailability] = useState('');
  const [bigDescription, setBigDescription] = useState('');
  const [partImage, setPartImage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const editingPart = location.state?.part; // Get the part data passed during edit

  useEffect(() => {
    if (editingPart) {
      setPartName(editingPart.partName);
      setShortDescription(editingPart.shortDescription);
      setPrice(editingPart.price);
      setAvailability(editingPart.availability);
      setBigDescription(editingPart.bigDescription);
      setPartImage(editingPart.image);
    }
  }, [editingPart]);

  const handleSave = () => {
    if (editingPart) {
      // Update existing part
      setParts((prevParts) =>
        prevParts.map((part) =>
          part.id === editingPart.id
            ? { ...part, partName, shortDescription, price, availability, bigDescription, image: partImage }
            : part
        )
      );
    } else {
      // Add new part
      const newPart = {
        id: Date.now(),
        partName,
        shortDescription,
        price,
        availability,
        bigDescription,
        image: partImage,
      };
      addPart(newPart);
    }

    navigate('/adminParts');
  };

  const handleCancel = () => {
    navigate('/adminParts');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPartImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="part-details">
      <div className="image-upload-box" onClick={() => document.getElementById('partImageInput').click()}>
        {partImage ? <img src={partImage} alt="Part Preview" /> : <span className="plus-sign">+</span>}
      </div>
      <input
        id="partImageInput"
        type="file"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleImageUpload}
      />

      <input
        type="text"
        placeholder="Part Name"
        value={partName}
        onChange={(e) => setPartName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Short Description"
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
        <option value="">Select Availability</option>
        <option value="available">Available</option>
        <option value="unavailable">Unavailable</option>
      </select>
      <textarea
        placeholder="Big Description"
        value={bigDescription}
        onChange={(e) => setBigDescription(e.target.value)}
      />

      <div className="button-group">
        <button onClick={handleSave}>Save</button>
        <button className="cancel-button" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default AdminPartDetails;
