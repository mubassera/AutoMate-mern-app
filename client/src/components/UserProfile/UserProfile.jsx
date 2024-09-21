import React, { useState, useEffect } from "react";
import { fetchProfileData, updateProfileData } from "../../Api/userPanel";
import "./UserProfile.css"; // Import the CSS file
import Navbar from "../navbar/navbar";

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
      const data = await fetchProfileData();
      setUserData({
        name: data?.name || "",
        email: data?.email || "",
        mobileNumber: data?.mobileNumber || "",
        address: data?.address || "",
        vehicleType: data?.vehicleType || "",
        vehicleBrand: data?.vehicleBrand || "",
        vehicleModel: data?.vehicleModel || "",
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
      const data = await updateProfileData(userData);
      setMessage("Profile updated successfully");
      setIsError(false);
      setUserData(data); // Update state with the updated user info
    } catch (error) {
      console.error("Error updating profile data:", error);
      setMessage("Error updating profile");
      setIsError(true);
    }
  };

  return (
    <div className="UPP">
      <Navbar />
      <div className="UP-profile-container">
      <h1>User Profile</h1>
      <form onSubmit={handleProfileUpdate}>
        {Object.entries(userData).map(([key, value]) => (
          <div className="UP-form-group" key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <input
              type={
                key === "mobileNumber"
                  ? "tel"
                  : key === "email"
                  ? "email"
                  : "text"
              }
              name={key}
              value={value}
              onChange={handleInputChange}
              required
            />
          </div>
        ))}

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
      {message && (
        <p className={`UP-message ${isError ? "error" : ""}`}>{message}</p>
      )}
    </div>


     <div className="box4">
        <div className="contactUs">
          <h3>Contact Us</h3>
          <p>123, ABC Street, Dhaka-1000, Bangladesh</p>
        </div>
      </div>
    </div>
    
  );
}

export default Profile;
