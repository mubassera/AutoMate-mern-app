const expressAsyncHandler = require("express-async-handler");
const Service = require("../models/serviceModel");
const mongoose = require("mongoose");

const fetchAllServicesController = expressAsyncHandler(async (req, res) => {
  try {
    const services = await Service.find({});
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services in server:", error);
    res.status(500).json({ message: "There was an error fetching services." });
  }
});

module.exports = {
  fetchAllServicesController,
};
