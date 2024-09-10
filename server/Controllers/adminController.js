const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const PartsModel = require("../models/partsModel");

const fetchAllUsersController = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/*const fetchUserByUsername = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      "-password"
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});*/

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
    const savedPart = await PartsModel.create({
      name: req.body.name,
      price: req.body.price,
      vehicleType: req.body.vehicleType,
      vehicleBrand: req.body.vehicleBrand,
      vehicleModel: req.body.vehicleModel,
      quantity: req.body.quantity,
      isAvailable: true,
      shortDescription: req.body.shortDescription,
      longDescription: req.body.longDescription,
    });
    res.status(201).json(savedPart);
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ error: "Failed to add user" });
  }
});

module.exports = {
  fetchAllUsersController,
  postNewUserController,
  editUserController,
  deleteUserController,
  postNewPartController,
};
