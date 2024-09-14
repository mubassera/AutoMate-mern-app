import React, { useState, useContext, useEffect } from "react";
import "./AdminPartDetails.css";
import { useNavigate, useLocation } from "react-router-dom";
//import { PartsContext } from "../PartsContext";
import { addPart, updatePart } from "../../../Api/adminPanel";

export const AdminPartDetails = () => {
  //const { parts, setParts } = useContext(PartsContext);
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [isAvailable, setIsAvailable] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [partImage, setPartImage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const editingPart = location.state?.part;

  useEffect(() => {
    if (editingPart) {
      setName(editingPart.name);
      setVehicleType(editingPart.vehicleType);
      setVehicleBrand(editingPart.vehicleBrand);
      setShortDescription(editingPart.shortDescription);
      setPrice(editingPart.price);
      setQuantity(editingPart.quantity);
      setIsAvailable(editingPart.isAvailable);
      setLongDescription(editingPart.longDescription);
      setPartImage(editingPart.image);
    }
  }, [editingPart]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("vehicleType", vehicleType);
    formData.append("vehicleBrand", vehicleBrand);
    formData.append("shortDescription", shortDescription);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("isAvailable", isAvailable);
    formData.append("longDescription", longDescription);
    if (partImage) {
      formData.append("image", partImage);
    }

    try {
      if (editingPart) {
        await updatePart(editingPart._id, formData);
      } else {
        await addPart(formData);
      }
      navigate("/adminParts");
    } catch (err) {
      console.error("Error saving part:", err);
    }
  };

  const handleCancel = () => {
    navigate("/adminParts");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPartImage(file);
    }
  };

  return (
    <div className="part-details">
      <div
        className="image-upload-box"
        onClick={() => document.getElementById("partImageInput").click()}
      >
        {partImage ? (
          <img
            src={
              typeof partImage === "string"
                ? partImage
                : URL.createObjectURL(partImage)
            }
            alt="Part Preview"
          />
        ) : (
          <span className="plus-sign">+</span>
        )}
      </div>
      <input
        id="partImageInput"
        type="file"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleImageUpload}
      />

      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        value={vehicleType}
        onChange={(e) => setVehicleType(e.target.value)}
      >
        <option value="">Select Vehicle Type</option>
        <option value="car">Car</option>
        <option value="bike">Bike</option>
      </select>
      <input
        type="text"
        placeholder="Vehicle Brand"
        value={vehicleBrand}
        onChange={(e) => setVehicleBrand(e.target.value)}
      />

      <input
        type="text"
        placeholder="Short Description"
        value={shortDescription}
        onChange={(e) => setShortDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <select
        value={isAvailable}
        onChange={(e) => setIsAvailable(e.target.value)}
      >
        <option value="">Select Availability</option>
        <option value="Yes">Available</option>
        <option value="No">Unavailable</option>
      </select>
      <textarea
        placeholder="Long Description"
        value={longDescription}
        onChange={(e) => setLongDescription(e.target.value)}
      />

      <div className="button-group">
        <button onClick={handleSave}>Save</button>
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AdminPartDetails;
