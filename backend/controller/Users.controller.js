const User = require('../models/Users.model');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "Madebyrajivandtushar";


const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

const checkUniqueUsername = async (username) => {
    const user = await User.findOne({ username });
    return !user;
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

const getNameByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        if (!validateEmail(email)) {
            return res.status(400).json({ error: "Email is not valid" });
        }

        const user = await User.findOne({ email }, 'name');
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        res.json({ name: user.name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const updatePassword = async (req, res) => {
    try {
        const { email, currentPassword, newPassword } = req.body;

        if (!validateEmail(email)) {
            return res.status(400).json({ error: "Email is not valid" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Current password is incorrect" });
        }

        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
        if (newPassword.length < 8 || !passwordRegex.test(newPassword)) {
            return res.status(400).json({ error: "New password must be at least 8 characters long, including a special character and a number" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const updateName = async (req, res) => {
    try {
        const { email } = req.params;
        const { name } = req.body;

        if (!validateEmail(email)) {
            return res.status(400).json({ error: "Email is not valid" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        user.name = name || user.name;
        await user.save();
        res.json({ message: "Name updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
const updateUsername = async (req, res) => {
    try {
        const { email } = req.params;
        const { username } = req.body;

        if (!validateEmail(email)) {
            return res.status(400).json({ error: "Email is not valid" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const isUsernameUnique = await checkUniqueUsername(username);
        if (!isUsernameUnique) {
            return res.status(400).json({ error: "Username already exists" });
        }

        user.username = username;
        await user.save();
        res.json({ message: "Username updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
const updateDescription = async (req, res) => {
    try {
        const { email } = req.params;
        const { description } = req.body;

        if (!validateEmail(email)) {
            return res.status(400).json({ error: "Email is not valid" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        user.description = description || user.description;
        await user.save();
        res.json({ message: "Description updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getUserDetailsByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        if (!validateEmail(email)) {
            return res.status(400).json({ error: "Email is not valid" });
        }

        // Retrieve all user details except the password
        const user = await User.findOne({ email }, 'name username description');
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createuser,
    loginuser,
    getNameByEmail,
    updatePassword,
    updateName,
    updateUsername,
    updateDescription,
    getUserDetailsByEmail
};
