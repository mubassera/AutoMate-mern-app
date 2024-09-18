const express = require("express");
const {
  loginController,
  registerController,
  logoutController,
  partsController,
  refreshTokenController,
  makeServiceRequestController,
  fetchUserDataController,
  updateUserDataController,
} = require("../Controllers/userController");
const verifyJWT = require("../middlewares/verifyJWT");

const Router = express.Router();

Router.post(`/login`, loginController);
Router.post(`/register`, registerController);
Router.post(`/logout`, logoutController);
Router.get(`/parts`, verifyJWT, partsController);
Router.post(`/refresh`, refreshTokenController);
Router.post(`/make-service-request`, makeServiceRequestController);
Router.put(`/profile`, updateUserDataController);
Router.get(`/profile`, verifyJWT, fetchUserDataController);

module.exports = Router;
