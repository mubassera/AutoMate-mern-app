const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const userRoutes = require("./Routes/userRoutes");

const app = express();
dotenv.config();

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running at http://localhost:${PORT}`));
