const express = require("express");
const app = express();
const mongoose = require("mongoose")
mongoose.connect(
  "mongodb+srv://razzivofficial:rOJUw5Dr785JZCYC@clusermd.pfxgblf.mongodb.net/?retryWrites=true&w=majority"
);
app.listen(3069, () => {
  console.log("Har har mahadev");
});
