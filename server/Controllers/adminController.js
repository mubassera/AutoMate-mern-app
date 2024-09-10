const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const fetchAllUsersController = expressAsyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 users per page
    const skip = (page - 1) * limit; // Calculate how many records to skip

    const totalUsers = await User.countDocuments(); // Total number of users
    const users = await User.find().select("-password").skip(skip).limit(limit);

    res.json({
      users,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    });
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

module.exports = {
  fetchAllUsersController,
  postNewUserController,
  editUserController,
  deleteUserController,
};
