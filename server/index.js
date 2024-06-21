const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("API is running1234");
});

app.listen(
  process.env.PORT,
  console.log(`Server is running at http://localhost:${process.env.PORT}`)
);
