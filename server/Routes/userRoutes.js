const express = require("express");
const {
  loginController,
  registerController,
  logoutController,
  partsController,
  refreshTokenController,
} = require("../Controllers/userController");
const verifyJWT = require("../middlewares/verifyJWT");

const Router = express.Router();

Router.post(`/login`, loginController);
Router.post(`/register`, registerController);
Router.post(`/logout`, logoutController);
Router.get(`/parts`, verifyJWT, partsController);
Router.post(`/refresh`, refreshTokenController);

module.exports = Router;
