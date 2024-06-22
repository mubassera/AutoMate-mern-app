const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");

const app = express();
dotenv.config();

//connecting mongodb
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("server is connected to db");
  } catch (err) {
    console.log("server is nottttttt connected to db");
  }
};

connectDb();

app.get("/", (req, res) => {
  res.send("API is running123");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running at http://localhost:${PORT}`));
