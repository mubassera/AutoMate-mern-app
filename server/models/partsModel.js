const mongoose = require("mongoose");

const partsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    vehicleType: { type: String, required: true },
    vehicleBrand: { type: String, required: true },
    // vehicleModel: { type: String, required: true },
    quantity: { type: Number, required: true },
    isAvailable: { type: String, required: true },
    shortDescription: { type: String, required: true },
    longDescription: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const PartsModel = mongoose.model("parts", partsSchema);
module.exports = PartsModel;
