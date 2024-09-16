import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../Api/auth";
import { useLocation } from "react-router-dom";

const PurchasePart = () => {
  const location = useLocation();
  const viewingPart = location.state?.part;
  //const [parts, setParts] = useState([]);
  //const [selectedPart, setSelectedPart] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {}, []);

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
        },
        config
      );

      const { paymentStatus } = response.data;
      console.log(response.data);

      setMessage(`Order placed successfully. Payment Status: ${paymentStatus}`);
    } catch (error) {
      setMessage("Failed to place order");
    }
  };

  return (
    <div>
      <h2 style={{ color: "black" }}>Purchase Part</h2>
      <p style={{ color: "black" }}>
        {viewingPart.name} -{viewingPart.vehicleType} -{" "}
        {viewingPart.vehicleBrand}-{viewingPart.price}
      </p>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
      />
      <button onClick={handleOrder}>Place Order</button>
      {message && <p style={{ color: "black" }}>{message}</p>}
    </div>
  );
};

export default PurchasePart;
