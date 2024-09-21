// models/Service.js
const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    enum: ["Car", "Bike"],
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
