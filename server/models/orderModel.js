const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    partId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "parts",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Pending", // Order status: 'Pending', 'Completed', 'Cancelled'
    },
    paymentStatus: {
      type: String,
      default: "Pending", // Payment status: 'Pending', 'Completed', 'Failed'
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
