import React from "react";
import { useLocation } from "react-router-dom";
import "./PartDetails.css";
import Navbar from "../navbar/navbar";

const PartDetails = () => {
  const location = useLocation();
  const viewingPart = location.state?.part;

  if (!viewingPart) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="part-details-container">
        <div className="part-image-section">
          <img
            src={viewingPart.image}
            alt={viewingPart.name}
            className="part-image-details"
          />
        </div>
        <div className="part-info-section">
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
        <div className="box4">
          <div className="contactUs">
            <h3>Contact Us</h3>
            <p>123, ABC Street, Dhaka-1000, Bangladesh</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartDetails;
