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
  // Car services
  { name: "Oil Change", vehicleType: "Car", cost: 50 },
  { name: "Tire Rotation", vehicleType: "Car", cost: 30 },
  { name: "Brake Inspection", vehicleType: "Car", cost: 100 },
  { name: "Battery Replacement", vehicleType: "Car", cost: 150 },
  { name: "Wheel Alignment", vehicleType: "Car", cost: 75 },
  { name: "Transmission Flush", vehicleType: "Car", cost: 200 },
  { name: "Spark Plug Replacement", vehicleType: "Car", cost: 80 },
  { name: "Air Filter Replacement", vehicleType: "Car", cost: 40 },
  { name: "Fuel System Cleaning", vehicleType: "Car", cost: 120 },
  { name: "Coolant Flush", vehicleType: "Car", cost: 90 },
  { name: "Power Steering Flush", vehicleType: "Car", cost: 85 },
  { name: "Brake Fluid Replacement", vehicleType: "Car", cost: 70 },
  { name: "Headlight Restoration", vehicleType: "Car", cost: 50 },
  { name: "AC System Recharge", vehicleType: "Car", cost: 100 },
  { name: "Engine Diagnostic", vehicleType: "Car", cost: 80 },
  { name: "Timing Belt Replacement", vehicleType: "Car", cost: 350 },
  { name: "Radiator Replacement", vehicleType: "Car", cost: 400 },
  { name: "Alternator Replacement", vehicleType: "Car", cost: 250 },
  { name: "Muffler Replacement", vehicleType: "Car", cost: 220 },
  { name: "Windshield Wiper Replacement", vehicleType: "Car", cost: 30 },
  { name: "Car Wash", vehicleType: "Car", cost: 25 },
  { name: "Interior Detailing", vehicleType: "Car", cost: 150 },
  { name: "Exterior Waxing", vehicleType: "Car", cost: 90 },
  { name: "Undercoating", vehicleType: "Car", cost: 200 },
  { name: "Tire Balancing", vehicleType: "Car", cost: 50 },
  { name: "Exhaust Repair", vehicleType: "Car", cost: 180 },
  { name: "Clutch Replacement", vehicleType: "Car", cost: 600 },
  { name: "Drive Shaft Repair", vehicleType: "Car", cost: 350 },
  { name: "Suspension Check", vehicleType: "Car", cost: 90 },
  { name: "Differential Repair", vehicleType: "Car", cost: 400 },
  { name: "Fuel Injector Service", vehicleType: "Car", cost: 180 },
  { name: "Oxygen Sensor Replacement", vehicleType: "Car", cost: 150 },
  { name: "Window Tinting", vehicleType: "Car", cost: 250 },
  { name: "Roof Rack Installation", vehicleType: "Car", cost: 300 },
  { name: "Audio System Upgrade", vehicleType: "Car", cost: 400 },
  { name: "Navigation System Installation", vehicleType: "Car", cost: 500 },
  { name: "Key Fob Programming", vehicleType: "Car", cost: 75 },
  { name: "Backup Camera Installation", vehicleType: "Car", cost: 300 },
  { name: "Alarm System Installation", vehicleType: "Car", cost: 400 },
  { name: "Bluetooth System Installation", vehicleType: "Car", cost: 200 },
  { name: "Leather Seat Repair", vehicleType: "Car", cost: 180 },
  { name: "Dashboard Cleaning", vehicleType: "Car", cost: 50 },
  { name: "Windshield Replacement", vehicleType: "Car", cost: 350 },
  { name: "Interior Air Filter Replacement", vehicleType: "Car", cost: 35 },
  { name: "Sunroof Installation", vehicleType: "Car", cost: 1000 },
  { name: "Fog Light Installation", vehicleType: "Car", cost: 150 },
  { name: "Remote Start Installation", vehicleType: "Car", cost: 350 },

  // Bike services
  { name: "Basic Tune-Up", vehicleType: "Bike", cost: 70 },
  { name: "Brake Adjustment", vehicleType: "Bike", cost: 30 },
  { name: "Chain Lubrication", vehicleType: "Bike", cost: 20 },
  { name: "Wheel Truing", vehicleType: "Bike", cost: 50 },
  { name: "Tire Replacement", vehicleType: "Bike", cost: 40 },
  { name: "Handlebar Adjustment", vehicleType: "Bike", cost: 25 },
  { name: "Brake Pad Replacement", vehicleType: "Bike", cost: 35 },
  { name: "Suspension Tuning", vehicleType: "Bike", cost: 80 },
  { name: "Gear Shifting Adjustment", vehicleType: "Bike", cost: 50 },
  { name: "Saddle Replacement", vehicleType: "Bike", cost: 45 },
  { name: "Pedal Replacement", vehicleType: "Bike", cost: 40 },
  { name: "Crankset Replacement", vehicleType: "Bike", cost: 100 },
  { name: "Bottom Bracket Service", vehicleType: "Bike", cost: 80 },
  { name: "Headset Adjustment", vehicleType: "Bike", cost: 30 },
  { name: "Fork Replacement", vehicleType: "Bike", cost: 200 },
  { name: "Hub Overhaul", vehicleType: "Bike", cost: 120 },
  { name: "Frame Alignment", vehicleType: "Bike", cost: 150 },
  { name: "Cable Replacement", vehicleType: "Bike", cost: 40 },
  { name: "Derailleur Adjustment", vehicleType: "Bike", cost: 50 },
  { name: "Brake Lever Replacement", vehicleType: "Bike", cost: 60 },
  { name: "Seatpost Adjustment", vehicleType: "Bike", cost: 20 },
  { name: "Grip Replacement", vehicleType: "Bike", cost: 25 },
  { name: "Light Installation", vehicleType: "Bike", cost: 60 },
  { name: "Kickstand Installation", vehicleType: "Bike", cost: 30 },
  { name: "Fender Installation", vehicleType: "Bike", cost: 40 },
  { name: "Rear Rack Installation", vehicleType: "Bike", cost: 70 },
  { name: "Puncture Repair", vehicleType: "Bike", cost: 15 },
  { name: "Chain Replacement", vehicleType: "Bike", cost: 60 },
  { name: "Spoke Replacement", vehicleType: "Bike", cost: 50 },
  { name: "Cassette Replacement", vehicleType: "Bike", cost: 70 },
  { name: "Derailleur Hanger Alignment", vehicleType: "Bike", cost: 40 },
  { name: "Brake Rotor Replacement", vehicleType: "Bike", cost: 50 },
  { name: "Hydraulic Brake Bleeding", vehicleType: "Bike", cost: 80 },
  { name: "Brake Cable Replacement", vehicleType: "Bike", cost: 35 },
  { name: "Gear Cable Replacement", vehicleType: "Bike", cost: 35 },
  { name: "Suspension Fork Service", vehicleType: "Bike", cost: 180 },
  { name: "Shock Service", vehicleType: "Bike", cost: 150 },
  { name: "Dropper Post Service", vehicleType: "Bike", cost: 120 },
  { name: "Tire Sealant Application", vehicleType: "Bike", cost: 30 },
  { name: "Bike Wash", vehicleType: "Bike", cost: 25 },
  { name: "Hydraulic Disc Brake Installation", vehicleType: "Bike", cost: 200 },
  { name: "Electronic Shifting Setup", vehicleType: "Bike", cost: 250 },
  { name: "Tubeless Tire Setup", vehicleType: "Bike", cost: 90 },
  { name: "Internal Cable Routing", vehicleType: "Bike", cost: 150 },
  { name: "Disc Brake Conversion", vehicleType: "Bike", cost: 250 },
];

const seedServices = async () => {
  await Service.deleteMany({});
  await Service.insertMany(services);
  console.log("Services added to the database.");
  mongoose.connection.close();
};

seedServices();
*/
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
