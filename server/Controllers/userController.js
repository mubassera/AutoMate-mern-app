const express = require("express");
const userModel = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");

const loginController = () => {};

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
    res.send(400);
    throw Error("All necessary input fields have no been filled");
  }

  //check for pre existing user
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    throw new Error("User already Exists");
  }

  //username already taken
  const userNameTaken = await userModel.findOne({ name });
  if (userNameTaken) {
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
});

module.exports = { loginController, registerController };
