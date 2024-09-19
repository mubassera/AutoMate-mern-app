import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchProfileData } from "../../Api/userPanel";
import "./UserProfile.css"; // Import the CSS file

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
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
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
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
        setIsError(true);
        setMessage("Failed to load profile data");
      }
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
      const accessToken = JSON.parse(localStorage.getItem("userData")).accessToken;
      const { data } = await axios.put(`http://localhost:5000/user/profile`, userData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMessage("Profile updated successfully");
      setIsError(false);
      setUserData(data); // Update state with the updated user info
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Error updating profile");
      setIsError(true);
    }
  };

  return (
    <div className="UP-profile-container">
      <h1>User Profile</h1>
      <form onSubmit={handleProfileUpdate}>
        {Object.entries(userData).map(([key, value]) => (
          <div className="UP-form-group" key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <input
              type={key === "mobileNumber" ? "tel" : key === "email" ? "email" : "text"}
              name={key}
              value={value}
              onChange={handleInputChange}
              required
            />
          </div>
        ))}
        <button type="submit">Update Profile</button>
      </form>
      {message && (
        <p className={`UP-message ${isError ? "error" : ""}`}>{message}</p>
      )}
    </div>
  );
}

export default Profile;
