import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchProfileData } from "../../Api/userPanel";

function Profile() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    address: "",
    vehicleType: "",
    vehicleBrand: "",
    vehicleModel: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const data = await fetchProfileData();
      setUserData({
        name: data.name || "",
        email: data.email || "",
        mobileNumber: data.mobileNumber || "",
        address: data.address || "",
        vehicleType: data.vehicleType || "",
        vehicleBrand: data.vehicleBrand || "",
        vehicleModel: data.vehicleModel || "",
      });
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const accessToken = JSON.parse(
        localStorage.getItem("userData")
      ).accessToken;
      const { data } = await axios.put(
        `http://localhost:5000/user/profile`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setMessage("Profile updated successfully");
      setUserData(data); // Update state with the updated user info
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Error updating profile");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>User Profile</h1>
      <form onSubmit={handleProfileUpdate}>
        <div style={{ marginBottom: "15px" }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Vehicle Type:</label>
          <input
            type="vehicleType"
            name="vehicleType"
            value={userData.vehicleType}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Vehicle Brand:</label>
          <input
            type="vehicleBrand"
            name="vehicleBrand"
            value={userData.vehicleBrand}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Vehicle Model:</label>
          <input
            type="vehicleModel"
            name="vehicleModel"
            value={userData.vehicleModel}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Mobile Number:</label>
          <input
            type="tel"
            name="mobileNumber"
            value={userData.mobileNumber}
            onChange={handleInputChange}
            placeholder="Enter mobile number"
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            placeholder="Enter your address"
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "blue",
            color: "white",
            cursor: "pointer",
            border: "none",
          }}
        >
          Update Profile
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Profile;
