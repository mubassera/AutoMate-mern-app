import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import "./PartDetails.css";

const PartDetails = () => {
  const location = useLocation();
  const viewingPart = location.state?.part;

  /*useEffect(() => {
    const fetchPartDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/parts/${partId}`);
        setPart(response.data);
      } catch (error) {
        console.error("Error fetching part details:", error);
      }
    };

    fetchPartDetails();
  }, [partId]);*/

  if (!viewingPart) return <p>Loading...</p>;

  return (
    <div className="part-details">
      <img
        src={viewingPart.image}
        alt={viewingPart.name}
        className="part-image"
      />
      <h1>{viewingPart.name}</h1>
      <p>
        <strong>Price:</strong> ${viewingPart.price}
      </p>
      <p>
        <strong>Availability:</strong>{" "}
        {viewingPart.isAvailable === "Yes" ? "Available" : "Not Available"}
      </p>
      <p>
        <strong>Description:</strong> {viewingPart.shortDescription}
      </p>
      <p>
        <strong>Long Description:</strong> {viewingPart.longDescription}
      </p>
      <button>Buy</button>
    </div>
  );
};

export default PartDetails;
