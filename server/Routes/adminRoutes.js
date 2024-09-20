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
  fetchAllOrdersController,
  postNewServiceController,
  updateServiceRequestController,
  fetchAllServiceRequestController,
  updateServiceCostController,
  deleteServiceController,
  vehicleTypeCountController,
  updateOrderController,
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
adminRouter.get(`/orders`, /* verifyJWT,*/ fetchAllOrdersController);
adminRouter.post("/update-order", /*verifyJWT,*/ updateOrderController);
adminRouter.post("/new-service", /*verifyJWT,*/ postNewServiceController);
adminRouter.put("/update-service-status/:id", updateServiceRequestController);
adminRouter.get("/service-requests", fetchAllServiceRequestController);
adminRouter.put("/services/:id", updateServiceCostController);
adminRouter.put("/services/:id", deleteServiceController);
adminRouter.get("/vehicle-type-count", vehicleTypeCountController);

module.exports = adminRouter;
