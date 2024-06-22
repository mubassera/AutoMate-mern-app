const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    id: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isServiceMan: {
      type: Boolean,
      default: false,
    },
    vehicleType: {
      type: String,
    },
    vehicleBrand: {
      type: String,
    },
    vehicleModel: {
      type: String,
    },
  },
  {
    timeStamp: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
