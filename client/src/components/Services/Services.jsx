import React, { useState, useEffect } from "react";
import axios from "axios";

function Services() {
  const [carServices, setCarServices] = useState([]);
  const [bikeServices, setBikeServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [message, setMessage] = useState("");
  const [customerPhone, setCustomerPhone] = useState(""); // State for mobile number
  const [comments, setComments] = useState(""); // New state for comments

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
          customerPhone, // Include the mobile number
          selectedServices,
          totalCost,
          comments, // Include the comments
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      console.error("Error booking services:", error);
      setMessage("There was an error sending the booking request.");
    }
  };

  return (
    <div style={{ padding: "20px", color: "black" }}>
      <h1>Car and Bike Services</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "50px",
        }}
      >
        <div>
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

        <div>
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

      <div style={{ marginTop: "20px" }}>
        <h2>Total Cost: ${totalCost}</h2>
      </div>

      <div style={{ marginTop: "20px" }}>
        <label>
          Mobile Number:
          <input
            type="tel"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            placeholder="Enter your mobile number"
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
      </div>

      <div style={{ marginTop: "20px" }}>
        <label>
          Comments:
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Enter your comments"
            style={{
              marginLeft: "10px",
              padding: "5px",
              width: "100%",
              height: "100px",
            }}
          />
        </label>
      </div>

      <button
        onClick={handleBookingRequest}
        disabled={selectedServices.length === 0 || !customerPhone}
        style={{
          backgroundColor:
            selectedServices.length > 0 && customerPhone ? "blue" : "gray",
          color: "white",
          padding: "10px 20px",
          cursor:
            selectedServices.length > 0 && customerPhone
              ? "pointer"
              : "not-allowed",
          marginTop: "20px",
        }}
      >
        Request Booking
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Services;
