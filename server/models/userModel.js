const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    mobileNumber: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true, // Fixed typo: use `timestamps` to enable createdAt/updatedAt fields
  }
);
/*
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = bcrypt.hash(this.password, salt);
  next();
}
);
*/
const User = mongoose.model("users", userSchema);
module.exports = User;
