const ENV=require("./.env")
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(BASE_URL);
  // try {
  //   await mongoose.connect(BASE_URL);
  //   console.log("Connected to mongo DB");
  // } catch (error) {
  //   console.error(error);
  // }
};

const port = 8080;
app.listen(port, () => {
  console.log("Har har mahadev");
});

module.exports = connectDB;
