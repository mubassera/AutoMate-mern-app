const expressAsyncHandler = require("express-async-handler");
const orderModel = require("../models/orderModel");
const Part = require("../models/partsModel");
const mongoose = require("mongoose");

// Simulate payment process
const processPayment = async (totalPrice) => {
  // this should be replaced with actual payment gateway logic (like- Stripe, PayPal, Bkash)
  const isPaymentSuccessful = Math.random() > 0.2; // 80% chance of success
  return isPaymentSuccessful ? "Completed" : "Failed";
};

// Place a new order
const placeOrder = expressAsyncHandler(async (req, res) => {
  try {
    const { partId, quantity, userId, paymentOption, note } = req.body;

    const part = await Part.findById(partId);

    if (!part) {
      res.status(404).json({ message: "Part not found" });
      throw new Error("Part not found");
    }

    const totalPrice = part.price * quantity;

    // Simulate payment process
    //const paymentStatus = await processPayment(totalPrice);

    const order = await orderModel.create({
      userId,
      partId,
      quantity,
      totalPrice,
      paymentOption,
      note,
      paymentStatus: "Pending",
    });

    res.status(201).json(order);
  } catch (error) {
    console.log("error placing order", error);
  }
});

// Get user order history
const getOrderHistory = expressAsyncHandler(async (req, res) => {
  try {
    const orders = await orderModel
      .find({ userId: new mongoose.Types.ObjectId(req.query.userId) })
      .populate("partId")
      .sort({ _id: -1 });
    res.json(orders);
  } catch (error) {
    console.log("error fetching order history in server", error);
    res.status(500).json({ message: "Error fetching order history" });
  }
});

// Update order payment status (Admin functionality)
const updatePaymentStatus = expressAsyncHandler(async (req, res) => {
  const { orderId, paymentStatus } = req.body;

  const order = await orderModel.findById(orderId);

  if (!order) {
    res.status(404).json({ message: "Order not found" });
    throw new Error("Order not found");
  }

  order.paymentStatus = paymentStatus;
  await order.save();

  res.json(order);
});

module.exports = { placeOrder, getOrderHistory, updatePaymentStatus };
