const express = require("express");
const {
  placeOrder,
  getOrderHistory,
} = require("../Controllers/orderController");
const { verifyJWT } = require("../middlewares/verifyJWT");

const orderRouter = express.Router();

orderRouter.post("/place-order", /*verifyJWT,*/ placeOrder);
orderRouter.get("/history", /*verifyJWT,*/ getOrderHistory);

module.exports = orderRouter;
