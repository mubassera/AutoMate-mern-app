const express = require("express");
const {
  fetchAllServicesController,
} = require("../Controllers/serviceController");
const { verifyJWT } = require("../middlewares/verifyJWT");

const serviceRouter = express.Router();

serviceRouter.get("/all-services" /*verifyJWT,*/, fetchAllServicesController);

module.exports = serviceRouter;
