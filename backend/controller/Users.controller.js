const User = require('../models/Users.model');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "Madebyrajivandtushar";

const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

const createuser = async (req, res) => {
    try {
        const userdetails = new User(req.body);

        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
        if (userdetails.password.length < 8 || !passwordRegex.test(userdetails.password)) {
            return res.status(400).json({ error: "Password must be at least 8 characters long, including a special character and a number" });
        }

        if (!validateEmail(userdetails.email)) {
            return res.status(400).json({ error: "Email is not valid" });
        }

        const existingUser = await User.findOne({ email: userdetails.email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists, please try another" });
        }

        const salt = await bcrypt.genSalt(10);
        userdetails.password = await bcrypt.hash(userdetails.password, salt);

        await userdetails.save();

        res.json({ message: "success", userdetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const loginuser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ error: "Email is not valid" });
        }

        let userdata = await User.findOne({ email });
        if (!userdata) {
            return res.status(400).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, userdata.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Password is incorrect" });
        }

        const data = {
            user: {
                id: userdata.id
            }
        };
        const token = jwt.sign(data, jwtSecret, { expiresIn: 3600 });
        return res.json({ success: true, authToken: token });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    createuser,
    loginuser
};
