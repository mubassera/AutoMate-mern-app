const express = require("express");
const verifyJWT = require("../middlewares/verifyJWT");
const {
  fetchAllUsersController,
  postNewUserController,
  editUserController,
  deleteUserController,
  postNewPartController,
  fetchAllPartsController,
} = require("../Controllers/adminController");

const adminRouter = express.Router();

//adminRouter.post(`/login`, loginController);
adminRouter.get(`/AllUsers`, verifyJWT, fetchAllUsersController);
adminRouter.post(`/AllUsers`, verifyJWT, postNewUserController);
adminRouter.put(`/AllUsers/:id`, verifyJWT, editUserController);
adminRouter.delete(`/AllUsers/:id`, verifyJWT, deleteUserController);

//for posting new parts details
adminRouter.post(`/NewParts`, verifyJWT, postNewPartController);
//for fetching all the parts
adminRouter.get(`/AllParts`, verifyJWT, fetchAllPartsController);

module.exports = adminRouter;
