import React, { useState, useEffect } from "react";
import { fetchProfileData, updateProfileData } from "../../Api/userPanel";
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
        <button type="submit">Update Profile</button>
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
            type="text"
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
            type="text"
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
            type="text"
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
      {message && (
        <p className={`UP-message ${isError ? "error" : ""}`}>{message}</p>
      )}
    </div>
  );
}

export default Profile;
