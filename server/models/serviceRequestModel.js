// models/ServiceRequest.js
const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  customerPhone: {
    type: String,
    required: true,
  },
  selectedServices: [
    {
      name: String,
      vehicleType: String,
      cost: Number,
    },
  ],
  totalCost: {
    type: Number,
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Completed", "Declined"],
    default: "Pending",
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Canceled"],
    default: "Pending",
  },
  comments: {
    type: String,
    trim: true,
  },
});

const ServiceRequest = mongoose.model("ServiceRequest", serviceRequestSchema);

module.exports = ServiceRequest;
