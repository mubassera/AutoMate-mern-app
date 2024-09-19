import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Services.css";
import Navbar from "../navbar/navbar";

function Services() {
  const [carServices, setCarServices] = useState([]);
  const [bikeServices, setBikeServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [message, setMessage] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [comments, setComments] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/all-services");
        const services = response.data;
        setCarServices(
          services.filter((service) => service.vehicleType === "Car")
        );
        setBikeServices(
          services.filter((service) => service.vehicleType === "Bike")
        );
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleServiceSelect = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const totalCost = selectedServices.reduce(
    (sum, service) => sum + service.cost,
    0
  );

  const handleBookingRequest = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const response = await axios.post(
        "http://localhost:5000/user/make-service-request",
        {
          customerName: userData.name,
          customerEmail: userData.email,
          customerPhone,
          selectedServices,
          totalCost,
          comments,
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      console.error("Error booking services:", error);
      setMessage("There was an error sending the booking request.");
    }
  };

  return (
    <div className="services-page">
      <Navbar />
      <div className="services-container">
        <h1>Car and Bike Services</h1>
        <div className="service-cards">
          <div className="service-card">
            <h2>Car Services</h2>
            <ul>
              {carServices.map((service) => (
                <li key={service.name}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service)}
                      onChange={() => handleServiceSelect(service)}
                    />
                    {`${service.name} - $${service.cost}`}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="service-card">
            <h2>Bike Services</h2>
            <ul>
              {bikeServices.map((service) => (
                <li key={service.name}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service)}
                      onChange={() => handleServiceSelect(service)}
                    />
                    {`${service.name} - $${service.cost}`}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="total-cost">
          <h2>Total Cost: ${totalCost}</h2>
        </div>

        <div className="phone-input">
          <label>
            Mobile Number:
            <br />
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="Enter your mobile number"
            />
          </label>
        </div>

        <div className="comments-section">
          <label>
            Comments:
            <br />
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Enter your comments"
            />
          </label>
        </div>

        <button
          className="booking-button"
          onClick={handleBookingRequest}
          disabled={selectedServices.length === 0 || !customerPhone}
        >
          Request Booking
        </button>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default Services;
