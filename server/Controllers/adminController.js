const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const PartsModel = require("../models/partsModel");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage } = require("../firebaseConfig");
const { v4: uuidv4 } = require("uuid");
//const multer = require("multer");
const path = require("path");
const orderModel = require("../models/orderModel");

// Setup multer for file uploads
/*const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set the upload destination folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});*/
// Helper function to upload to Firebase
const uploadToFirebase = async (file) => {
  const storageRef = ref(storage, `parts/${uuidv4()}-${file.originalname}`);
  const metadata = { contentType: file.mimetype };

  const snapshot = await uploadBytes(storageRef, file.buffer, metadata);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

//const upload = multer({ storage });

const fetchAllUsersController = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

const postNewUserController = expressAsyncHandler(async (req, res) => {
  try {
    const savedUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: 123456,
      vehicleType: req.body.vehicleType,
      vehicleBrand: req.body.vehicleBrand,
      vehicleModel: req.body.vehicleModel,
    });
    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ error: "Failed to add user" });
  }
});

const editUserController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

const deleteUserController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

//post new part details
const postNewPartController = expressAsyncHandler(async (req, res) => {
  try {
    let imageUrl = null;

    // Check if a file is uploaded
    if (req.file) {
      imageUrl = await uploadToFirebase(req.file);
    }
    const savedPart = await PartsModel.create({
      name: req.body.name,
      price: req.body.price,
      vehicleType: req.body.vehicleType,
      vehicleBrand: req.body.vehicleBrand,
      // vehicleModel: req.body.vehicleModel,
      quantity: req.body.quantity,
      isAvailable: req.body.isAvailable,
      shortDescription: req.body.shortDescription,
      longDescription: req.body.longDescription,
      //image: req.file ? `/uploads/${req.file.filename}` : null,
      image: imageUrl,
    });
    res.status(201).json(savedPart);
  } catch (err) {
    console.error("Error adding part:", err);
    res.status(500).json({ error: "Failed to add part" });
  }
});

//fetch all parts
const fetchAllPartsController = expressAsyncHandler(async (req, res) => {
  try {
    const parts = await PartsModel.find();
    res.json(parts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Controller for updating a part
const updatePartController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPart = await PartsModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedPart);
  } catch (err) {
    res.status(500).json({ error: "Failed to update part" });
  }
});

//controller for deleting a part
const deletePartController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await PartsModel.findByIdAndDelete(id);
    res.json({ message: "Part deleted successfully" });
  } catch (err) {
    console.error("Error deleting part:", err);
    res.status(500).json({ error: "Failed to delete Part" });
  }
});

//fetch orders
const fetchAllOrdersController = expressAsyncHandler(async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = {
  fetchAllUsersController,
  postNewUserController,
  editUserController,
  deleteUserController,
  postNewPartController,
  fetchAllPartsController,
  updatePartController,
  deletePartController,
  fetchAllOrdersController,
};
