const express = require("express");
const verifyJWT = require("../middlewares/verifyJWT");
const {
  fetchAllUsersController,
  postNewUserController,
  editUserController,
  deleteUserController,
  postNewPartController,
  fetchAllPartsController,
  updatePartController,
  deletePartController,
} = require("../Controllers/adminController");

//storage related
const multer = require("multer");
const storage = multer.memoryStorage(); // Store file in memory for Firebase upload
const upload = multer({ storage });

//admin router
const adminRouter = express.Router();

//adminRouter.post(`/login`, loginController);
adminRouter.get(`/AllUsers`, verifyJWT, fetchAllUsersController);
adminRouter.post(`/AllUsers`, verifyJWT, postNewUserController);
adminRouter.put(`/AllUsers/:id`, verifyJWT, editUserController);
adminRouter.delete(`/AllUsers/:id`, verifyJWT, deleteUserController);

//for posting new parts details
adminRouter.post(
  "/AllParts",
  /* verifyJWT,*/ upload.single("image"),
  postNewPartController
);
adminRouter.get(`/AllParts`, /* verifyJWT,*/ fetchAllPartsController);
adminRouter.put(
  "/AllParts/:id",
  /* verifyJWT,*/ upload.single("image"),
  updatePartController
);
adminRouter.delete(`/AllParts/:id`, /* verifyJWT,*/ deletePartController);

module.exports = adminRouter;
