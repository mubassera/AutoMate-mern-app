import React, { useState, useEffect } from "react";
import { fetchServiceHistory } from "../../Api/userPanel"; // Import the new API function
import Navbar from "../navbar/navbar";
import './ServiceHistory.css';

const ServiceHistory = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("userData"))._id;
        const serviceHistory = await fetchServiceHistory(userId);
        setServices(serviceHistory);
      } catch (error) {
        console.log("Error fetching service history", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="SH-service-history-page">
      <Navbar />
      <div className="SH-service-history-container">
        <h2>Your Service Requests</h2>
        <ul className="SH-service-history-list">
          {services.map((service, index) => (
            <li key={index} className="SH-service-card">
              <div className="SH-service-details">
                <p>
                  <span>Service Request ID:</span> {service._id}
                </p>
                <div>
                  <span>Selected Services:</span>
                  <ul>
                    {service.selectedServices.map((s, index) => (
                      <li key={index}>
                        {s.name} - ${s.cost}
                      </li>
                    ))}
                  </ul>
                </div>
                <p>
                  <span>Booking Date:</span>{" "}
                  {new Date(service.bookingDate).toLocaleDateString()}
                </p>
                <p>
                  <span>Total Price:</span> ${service.totalCost}
                </p>
                <p>
                  <span>Status:</span> {service.status}
                </p>
                <p>
                  <span>Payment Status:</span> {service.paymentStatus}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
 <div className="box4">
        <div className="contactUs">
          <h3>Contact Us</h3>
          <p>123, ABC Street, Dhaka-1000, Bangladesh</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceHistory;
