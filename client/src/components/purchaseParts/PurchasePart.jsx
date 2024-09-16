import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../../Api/auth"; // Assuming getToken exists for auth token
import { useLocation } from "react-router-dom";
import './PurchasePart.css';

const PurchasePart = () => {
  const location = useLocation();
  const viewingPart = location.state?.part; // Access part data passed from PartDetails
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [note, setNote] = useState("");

  const handleOrder = async () => {
    try {
      const token = getToken();
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const response = await axios.post(
        "http://localhost:5000/order/place-order",
        {
          partId: viewingPart._id,
          quantity,
          userId: JSON.parse(localStorage.getItem("userData"))._id,
          paymentOption,
          note,
        },
        config
      );

      const { paymentStatus } = response.data;
      setMessage(`Order placed successfully. Payment Status: ${paymentStatus}`);
    } catch (error) {
      setMessage("Failed to place order");
    }
  };

  return (
    <div className="purchase-part-container">
      <div className="image-section">
        <img src={viewingPart.imageUrl} alt={viewingPart.name} className="part-image" />
      </div>
      <div className="details-section">
        <h2>Purchase Part</h2>
        <p className="part-details">
          <div><strong>{viewingPart.name}</strong></div>
          <div>Type: {viewingPart.vehicleType}</div>
          <div>Brand: {viewingPart.vehicleBrand}</div>
          <div>Price: ${viewingPart.price}</div>
        </p>
        <div>
          Quantity: 
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            className="quantity-input"
          />
        </div>
        <div>
          <label htmlFor="payment-option">Choose Payment Option:</label>
          <select 
            id="payment-option" 
            value={paymentOption} 
            onChange={(e) => setPaymentOption(e.target.value)}
            className="payment-dropdown"
          >
            <option value="">Select Payment Option</option>
            <option value="credit-card">Cash On Delivary</option>
            
          </select>
        </div>
        <div>
          <label htmlFor="note">Add Note:</label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="note-textarea"
            rows="4"
            placeholder="Add any special instructions or notes here..."
          />
        </div>
        <button onClick={handleOrder} className="order-button">Place Order</button>
        {message && <p className="order-message">{message}</p>}
      </div>
    </div>
  );
};

export default PurchasePart;
