require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(MONGO_URL);
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Sambandham Bhavati");
  } catch (error) {
    console.log("Sambandham Asafal", error.message);
    console.error(error);
  }
};

/* Importing models */
const User = require("./models/Users");

//Middlewaire for parsing JSON
app.use(express.json());

//Registration
app.post("/register", async (req, res) => {
  try {
    const { useremail, password } = req.body;
    console.log("user email", useremail, "password", password);
    console.log(req.body);
    const user = new User({ useremail, password });
    await user.save();
    res.status(201).json({ message: "Registration is successful" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
});

/* Login */
app.post('/login', async (req, res) => {
  try {
    const { useremail, password } = req.body;
    const user = await User.findOne({ useremail });

    if (!user) {
      return res.status(401).json({ error: "Invalid Useremail or password" });
    }

    // Compare the stored password hash with the provided password
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid useremail or Password' });
    }

    res.status(200).json({ message: "Login Successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

const port = 8080;
app.listen(port, () => {
  console.log("Har har mahadev");
  connectDB();
});

module.exports = connectDB;
