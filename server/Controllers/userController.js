const express = require("express");
const userModel = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");
const {
  generateRefreshToken,
  generateAccessToken,
} = require("../Config/generateToken");
const jwt = require("jsonwebtoken");
const PartsModel = require("../models/partsModel");
const ServiceRequest = require("../models/serviceRequestModel");
const mongoose = require("mongoose");

//login controller for logging in
const loginController = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  //console.log("fetched user data");

  if (user && (await user.matchPassword(password))) {
    const response = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      refreshToken: generateRefreshToken(user._id),
      accessToken: generateAccessToken(user._id),
    };
    console.log(response);
    //console.log("user exists");
    res.json(response);
  } else {
    res.json("Invalid email or password");
    throw new Error("Invalid email or password");
  }
});

//register controller for signing up
const registerController = expressAsyncHandler(async (req, res) => {
  const { name, email, password, vehicleType, vehicleBrand, vehicleModel } =
    req.body;

  //check for all fields to be filled
  if (
    !name ||
    !email ||
    !password ||
    !vehicleType ||
    !vehicleBrand ||
    !vehicleModel
  ) {
    //res.send(400);
    res.json("choose your vehicle");
    throw Error("All necessary input fields have no been filled");
  }

  //check for pre existing user
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    res.json("User already Exists");
    throw new Error("User already Exists");
  }

  //username already taken
  const userNameTaken = await userModel.findOne({ name });
  if (userNameTaken) {
    res.json("Username already Exists");
    throw new Error("Username has been taken");
  }

  //create an entry in the database
  const user = await userModel.create({
    name,
    email,
    password,
    vehicleType,
    vehicleBrand,
    vehicleModel,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      refreshToken: generateRefreshToken(user._id),
      accessToken: generateAccessToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Registration Error");
  }
});

//logout controller for logging out
const logoutController = expressAsyncHandler(async (req, res) => {
  res.json({ message: "Logout successful" });
});

//get the parts
const partsController = expressAsyncHandler(async (req, res) => {
  const {
    name,
    vehicleType,
    vehicleBrand,
    isAvailable,
    page = 1,
    limit = 10,
  } = req.query;
  const query = {};
  if (name) query.name = new RegExp(name, "i");
  if (vehicleType) query.vehicleType = new RegExp(vehicleType, "i");
  if (vehicleBrand) query.vehicleBrand = new RegExp(vehicleBrand, "i");
  if (isAvailable) query.isAvailable = new RegExp(isAvailable, "i");

  try {
    const parts = await PartsModel.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalParts = await PartsModel.countDocuments(query);
    res.json({
      parts,
      totalPages: Math.ceil(totalParts / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const refreshTokenController = expressAsyncHandler(async (req, res) => {
  const { refreshToken, _id } = req.body;
  console.log(refreshToken);

  if (!refreshToken) {
    return res.status(403).json({ message: "Refresh token required" });
  }

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Invalid refresh token:", err);
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const accessToken = generateAccessToken(_id);
    res.json({ accessToken });
  });
});

//user making service request
const makeServiceRequestController = expressAsyncHandler(async (req, res) => {
  try {
    const {
      customerId,
      customerEmail,
      customerPhone,
      selectedServices,
      totalCost,
      bookingDate,
      comments,
    } = req.body;

    // Create a new service request
    const serviceRequest = new ServiceRequest({
      customerId,
      customerEmail,
      customerPhone,
      selectedServices,
      totalCost,
      bookingDate,
      paymentStatus: "Pending",
      comments,
    });

    // Save the service request to the database
    await serviceRequest.save();

    res
      .status(201)
      .json({ message: "making request successful!", serviceRequest });
  } catch (error) {
    console.error("Error processing making request:", error);
    res
      .status(500)
      .json({ message: "There was an error processing your request." });
  }
});

//update user data
const updateUserDataController = expressAsyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.mobileNumber = req.body.mobileNumber || user.mobileNumber;
    user.address = req.body.address || user.address;
    user.vehicleType = req.body.vehicleType || user.vehicleType;
    user.vehicleBrand = req.body.vehicleBrand || user.vehicleBrand;
    user.vehicleModel = req.body.vehicleModel || user.vehicleModel;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      mobileNumber: updatedUser.mobileNumber,
      address: updatedUser.address,
      vehicleType: updatedUser.vehicleType,
      vehicleBrand: updatedUser.vehicleBrand,
      vehicleModel: updatedUser.vehicleModel,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//fetch user data
const fetchUserDataController = async (req, res) => {
  try {
    // Find user by ID (from the auth middleware)
    const user = await userModel.findById(req.user._id);
    console.log("id:" + req.user._id);

    if (user) {
      // Return user data (excluding the password)
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
        address: user.address,
        vehicleType: user.vehicleType,
        vehicleBrand: user.vehicleBrand,
        vehicleModel: user.vehicleModel,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getServiceHistoryController = expressAsyncHandler(async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.find({
      customerId: new mongoose.Types.ObjectId(req.params.id),
    }).populate("customerId");
    console.log(serviceRequests);
    res.json(serviceRequests);
  } catch (error) {
    console.log("error fetching service history in server", error);
    res.status(500).json({ message: "Error fetching order history" });
  }
});

module.exports = {
  loginController,
  registerController,
  logoutController,
  partsController,
  refreshTokenController,
  makeServiceRequestController,
  updateUserDataController,
  fetchUserDataController,
  getServiceHistoryController,
};
