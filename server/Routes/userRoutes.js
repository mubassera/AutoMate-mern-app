const express = require("express");
const {
  loginController,
  registerController,
  logoutController,
  partsController,
} = require("../Controllers/userController");

const Router = express.Router();

Router.post(`/login`, loginController);
Router.post(`/register`, registerController);
Router.post(`/logout`, logoutController);
Router.get(`/parts`, partsController);

module.exports = Router;
