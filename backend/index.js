const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
mongoose.connect(
  "mongodb+srv://razzivofficial:rOJUw5Dr785JZCYC@clusermd.pfxgblf.mongodb.net/?retryWrites=true&w=majority"
);
app.listen(port, () => {
  console.log("Har har mahadev");
});
