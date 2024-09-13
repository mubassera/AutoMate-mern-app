import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './PartDetails.css';

const PartDetails = () => {
  const { partId } = useParams(); // Get partId from URL
  const [part, setPart] = useState(null);

  useEffect(() => {
    const fetchPartDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/parts/${partId}`);
        setPart(response.data);
      } catch (error) {
        console.error("Error fetching part details:", error);
      }
    };

    fetchPartDetails();
  }, [partId]);

  if (!part) return <p>Loading...</p>;

  return (
    <div className="part-details">
      <img src={part.imageUrl} alt={part.name} className="part-image" />
      <h1>{part.name}</h1>
      <p><strong>Price:</strong> ${part.price}</p>
      <p><strong>Availability:</strong> {part.availability ? "Available" : "Not Available"}</p>
      <p><strong>Description:</strong> {part.description}</p>
      <p><strong>Long Description:</strong> {part.longDescription}</p>
    </div>
  );
};

export default PartDetails;
