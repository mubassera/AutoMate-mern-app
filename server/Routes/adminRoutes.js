const express = require("express");
const verifyJWT = require("../middlewares/verifyJWT");
const {
  fetchAllUsersController,
  postNewUserController,
  editUserController,
  deleteUserController,
} = require("../Controllers/adminController");

const adminRouter = express.Router();

//adminRouter.post(`/login`, loginController);
adminRouter.get(`/AllUsers`, verifyJWT, fetchAllUsersController);
adminRouter.post(`/AllUsers`, verifyJWT, postNewUserController);
adminRouter.put(`/AllUsers/:id`, verifyJWT, editUserController);
adminRouter.delete(`/AllUsers/:id`, verifyJWT, deleteUserController);

module.exports = adminRouter;
