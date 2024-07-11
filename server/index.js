const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes");
const adminRoutes = require("./Routes/adminRoutes");

const app = express();
dotenv.config();

// Middleware to set CORS headers
app.use((req, res, next) => {
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
});

app.use(
  cors({
    origin: ["http://auto-mate-mern-app.vercel.app"],
    methods: ["GET, POST, OPTIONS, PUT, PATCH, DELETE"],
    credentials: true,
  })
);
app.use(express.json());

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

//mock
app.get("/", (req, res) => {
  res.send("API is running123");
});

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running at http://localhost:${PORT}`));
