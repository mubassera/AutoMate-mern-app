const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const http = require("http");
const path = require("path");
const userRoutes = require("./Routes/userRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const orderRoutes = require("./Routes/orderRoutes");
const Service = require("./models/serviceModel");
const serviceRouter = require("./Routes/serviceRoutes");

const app = express();
dotenv.config();

// Middleware to set CORS headers
/*app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://auto-mate-mern-app.vercel.app"
  );
  // Add other headers as needed
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});*/

app.use(
  cors({
    //origin: "https://auto-mate-mern-app.vercel.app",
    //methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    //credentials: true,
  })
);
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//connecting mongodb
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("server is connected to db");
  } catch (err) {
    console.log("server is nottttttt connected to db", err.message);
  }
};
connectDb();

/*const services = [
  { name: "Oil Change", vehicleType: "Car", cost: 50 },
  { name: "Tire Rotation", vehicleType: "Car", cost: 30 },
  { name: "Brake Inspection", vehicleType: "Car", cost: 100 },
  { name: "Battery Replacement", vehicleType: "Car", cost: 150 },
  { name: "Wheel Alignment", vehicleType: "Car", cost: 75 },
  { name: "Basic Tune-Up", vehicleType: "Bike", cost: 70 },
  { name: "Brake Adjustment", vehicleType: "Bike", cost: 30 },
  { name: "Chain Lubrication", vehicleType: "Bike", cost: 20 },
  { name: "Wheel Truing", vehicleType: "Bike", cost: 50 },
  { name: "Tire Replacement", vehicleType: "Bike", cost: 40 },
];

const seedServices = async () => {
  await Service.deleteMany({});
  await Service.insertMany(services);
  console.log("Services added to the database.");
  mongoose.connection.close();
};

seedServices();*/

//mock
app.get("/", (req, res) => {
  res.send("API is running123");
});

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/order", orderRoutes);
app.use("/", serviceRouter);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(
  PORT,
  console.log(`Server is running at http://localhost:${PORT}`)
);
