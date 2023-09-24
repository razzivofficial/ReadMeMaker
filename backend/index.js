const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://razzivofficial:rOJUw5Dr785JZCYC@clusermd.pfxgblf.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Connected to mongo DB");
  } catch (error) {
    console.error(error);
  }
};

const port = 8080;
app.listen(port, () => {
  console.log("Har har mahadev");
});

module.exports = connectDB;
