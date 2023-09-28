const ENV = require("./.env");
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

/*  */
const User = require("./models/Users");

//Middlewaire for parsing JSON
app.use(express.json());

//Registration
app.post("/register", async (req, res) => {
  try {
    const { useremail, password } = req.body;
    console.log("user email", useremail, "password", password);
    console.log(req.body);
    // if (!useremail || !password) {
    //   console.log('no data');
    //   res.status(401).send({ message: 'Please enter all the fields' });
    // } else {
    //   console.log('data present')
    //   let newUser = new User({
    //     username: username,
    //     useremail: useremail,
    //     password: password
    //     })
    const user = new User({ useremail, password });
    await user.save();
    res.status(201).json({ message: "Registration is successful" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
    console.log(error);
  }
});

const port = 8080;
app.listen(port, () => {
  console.log("Har har mahadev");
});

module.exports = connectDB;
