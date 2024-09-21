const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const PartsModel = require("../models/partsModel");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { storage } = require("../firebaseConfig");
const { v4: uuidv4 } = require("uuid");
//const multer = require("multer");
const path = require("path");
const orderModel = require("../models/orderModel");
const Service = require("../models/serviceModel");
const ServiceRequest = require("../models/serviceRequestModel");

const nodemailer = require("nodemailer");

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "austcse49b@gmail.com",
    pass: "oqzb gsof mjso jryv",
  },
});

// Setup multer for file uploads
/*const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set the upload destination folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});*/
// Helper function to upload to Firebase
const uploadToFirebase = async (file) => {
  const storageRef = ref(storage, `parts/${uuidv4()}-${file.originalname}`);
  const metadata = { contentType: file.mimetype };

  const snapshot = await uploadBytes(storageRef, file.buffer, metadata);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

//const upload = multer({ storage });

const fetchAllUsersController = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

const postNewUserController = expressAsyncHandler(async (req, res) => {
  try {
    const savedUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: 123456,
      vehicleType: req.body.vehicleType,
      vehicleBrand: req.body.vehicleBrand,
      vehicleModel: req.body.vehicleModel,
    });
    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ error: "Failed to add user" });
  }
});

const editUserController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

const deleteUserController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

//post new part details
const postNewPartController = expressAsyncHandler(async (req, res) => {
  try {
    let imageUrl = null;

    // Check if a file is uploaded
    if (req.file) {
      imageUrl = await uploadToFirebase(req.file);
    }
    const savedPart = await PartsModel.create({
      name: req.body.name,
      price: req.body.price,
      vehicleType: req.body.vehicleType,
      vehicleBrand: req.body.vehicleBrand,
      // vehicleModel: req.body.vehicleModel,
      quantity: req.body.quantity,
      isAvailable: req.body.isAvailable,
      shortDescription: req.body.shortDescription,
      longDescription: req.body.longDescription,
      //image: req.file ? `/uploads/${req.file.filename}` : null,
      image: imageUrl,
    });
    res.status(201).json(savedPart);
  } catch (err) {
    console.error("Error adding part:", err);
    res.status(500).json({ error: "Failed to add part" });
  }
});

//fetch all parts
const fetchAllPartsController = expressAsyncHandler(async (req, res) => {
  try {
    const parts = await PartsModel.find();
    res.json(parts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Controller for updating a part
const updatePartController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPart = await PartsModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedPart);
  } catch (err) {
    res.status(500).json({ error: "Failed to update part" });
  }
});

//controller for deleting a part
const deletePartController = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await PartsModel.findByIdAndDelete(id);
    res.json({ message: "Part deleted successfully" });
  } catch (err) {
    console.error("Error deleting part:", err);
    res.status(500).json({ error: "Failed to delete Part" });
  }
});

//fetch orders
const fetchAllOrdersController = expressAsyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 5, paymentStatus, status } = req.query;

    const query = {};
    if (paymentStatus) {
      query.paymentStatus = paymentStatus; // Filter by payment status
    }
    if (status) {
      query.status = status; // Filter by order status
    }

    // Paginate and filter orders
    const orders = await orderModel
      .find(query)
      .populate("partId")
      .populate("userId") // Populate partId if necessary
      .sort({ _id: -1 })
      .limit(limit * 1) // Convert limit to a number
      .skip((page - 1) * limit)
      .exec();

    // Get total count for pagination
    const count = await orderModel.countDocuments(query);

    // Return the orders and the total count
    res.json({
      orders,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Server Error");
  }
});

//post new service
const postNewServiceController = expressAsyncHandler(async (req, res) => {
  try {
    const newService = await Service.create({
      name: req.body.name,
      vehicleType: req.body.vehicleType,
      cost: req.body.cost,
    });
    res.status(201).json(newService);
  } catch (err) {
    console.error("Error adding service:", err);
    res.status(500).json({ error: "Failed to add service" });
  }
});

//update order controller
const updateOrderController = expressAsyncHandler(async (req, res) => {
  try {
    const { orderId, status, paymentStatus } = req.body;
    const order = await orderModel
      .findById(orderId)
      .populate("userId")
      .populate("partId");

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      throw new Error("Order not found");
    }

    order.paymentStatus = paymentStatus;
    order.status = status;
    await order.save();

    // Send email to customer
    const mailOptions = {
      from: "austcse49b@gmail.com",
      to: order.userId.email, // Assuming you have the customer's email in the order
      subject: "Order Status Update",
      text: `Hello, your order status of orderID: ${order._id} has been updated to: ${status}.

Order Details
- OrderID: ${order._id},
- Part Name: ${order.partId.name},
- Quantity: ${order.quantity},
- Total Cost: ${order.totalPrice},
- Status: ${status}
- Payment status: ${paymentStatus}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.json(order);
  } catch (error) {
    console.error("Error updating service status:", error);
    res.status(500).send({ message: "Error updating service status" });
  }
});

//update payment status and status of service request
const updateServiceRequestController = expressAsyncHandler(async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const serviceRequest = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      { status, paymentStatus },
      { new: true }
    );

    if (!serviceRequest) {
      return res.status(404).send({ message: "Service request not found" });
    }

    // Send email to the customer
    const mailOptions = {
      from: "austcse49b@gmail.com",
      to: serviceRequest.customerEmail, // Assuming you have the customer's email in the serviceRequest
      subject: "Service Request Status Update",
      text: `Hello, the status of your Service Request ID: ${
        serviceRequest._id
      } has been updated to: ${serviceRequest.status}.

Service Request Details:
- Service Request ID: ${serviceRequest._id}
- Customer Email: ${serviceRequest.customerEmail}
- Customer Phone: ${serviceRequest.customerPhone}
- Selected Services: ${serviceRequest.selectedServices
        .map(
          (service) =>
            `${service.name} (Vehicle Type: ${service.vehicleType}, Cost: $${service.cost})`
        )
        .join(", ")}
- Booking Date: ${serviceRequest.bookingDate.toLocaleDateString()}
- Total Cost: ${serviceRequest.totalCost}BDT
- Current Status: ${serviceRequest.status}
- Payment Status: ${serviceRequest.paymentStatus}
- Additional Comments: ${serviceRequest.comments || "N/A"}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.send({ message: "Service status updated", serviceRequest });
  } catch (error) {
    console.error("Error updating service status:", error);
    res.status(500).send({ message: "Error updating service status" });
  }
});
//fetch all service requests
const fetchAllServiceRequestController = expressAsyncHandler(
  async (req, res) => {
    try {
      const { page = 1, limit = 5, status, paymentStatus } = req.query;

      const query = {};
      if (status) {
        query.status = status;
      }
      if (paymentStatus) {
        query.paymentStatus = paymentStatus;
      }

      // Paginate and filter service requests
      const serviceRequests = await ServiceRequest.find(query)
        .limit(limit * 1) // Convert to number
        .skip((page - 1) * limit)
        .populate("customerId")
        .sort({ _id: -1 })
        .exec();

      // Get total count for pagination
      const count = await ServiceRequest.countDocuments(query);

      // Return the service requests and the total count
      res.json({
        serviceRequests,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
      });
    } catch (error) {
      console.error("Error fetching service requests:", error);
      res.status(500).send("Server Error");
    }
  }
);

//update cost of a service
const updateServiceCostController = expressAsyncHandler(async (req, res) => {
  try {
    const { cost } = req.body;
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { cost },
      { new: true }
    );

    if (!service) {
      return res.status(404).send({ message: "Service not found" });
    }

    res.send({ message: "Service updated", service });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).send({ message: "Error updating service" });
  }
});

//delete a service
const deleteServiceController = expressAsyncHandler(async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).send({ message: "Service not found" });
    }

    res.send({ message: "Service deleted", service });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).send({ message: "Error deleting service" });
  }
});

//get vehicletype count
const vehicleTypeCountController = expressAsyncHandler(async (req, res) => {
  try {
    const carCount = await User.countDocuments({ vehicleType: "Car" });
    const bikeCount = await User.countDocuments({ vehicleType: "Bike" });

    res.json({ car: carCount, bike: bikeCount });
  } catch (error) {
    res.status(500).json({ message: "Error fetching vehicleType data" });
  }
});

module.exports = {
  fetchAllUsersController,
  postNewUserController,
  editUserController,
  deleteUserController,
  postNewPartController,
  fetchAllPartsController,
  updatePartController,
  deletePartController,
  fetchAllOrdersController,
  updateOrderController,
  postNewServiceController,
  updateServiceRequestController,
  fetchAllServiceRequestController,
  updateServiceCostController,
  deleteServiceController,
  vehicleTypeCountController,
};
