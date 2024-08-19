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


const uniqueusername = async (req, res) => {
    try {
      const { username } = req.params;
  
      // Query the database to find a user with the provided username
      const user = await User.findOne({ username });
  
      // If user is found, the username is not unique
      if (user) {
        return res.json({ available: false, message: "Username is already taken" });
      }
  
      // If user is not found, the username is unique
      return res.json({ available: true, message: "Username is available" });
    } catch (error) {
      console.error("Error checking username uniqueness:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
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

        // Check if the email is already in use
        const existingUser = await User.findOne({ email: userdetails.email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists, please try another" });
        }

        // Check if the username is unique
        const isUniqueUsername = await checkUniqueUsername(userdetails.username);
        if (!isUniqueUsername) {
            return res.status(400).json({ error: "Username already exists, please try another" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        userdetails.password = await bcrypt.hash(userdetails.password, salt);

        // Save the user
        await userdetails.save();

        res.json({ message: "success", userdetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ error: "Email is not valid" });
        }

        const userdata = await User.findOne({ email });
        if (!userdata) {
            return res.status(400).json({ error: "User not found" });
        }
        
        if (userdata.isgoogle) {
            return res.status(400).json({ error: "This email is registered using Google. Please login using Google." });
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

        // Return the user ID along with the auth token
        return res.json({ success: true, authToken: token, userId: userdata.id });
    } catch (err) {
        res.status(500).json(err);
    }
};

const loginusergoogle = async (req, res) => {
    try {
        const { email, password } = req.body;

        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ error: "Email is not valid" });
        }

        const userdata = await User.findOne({ email });
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

        // Return the user ID along with the auth token
        return res.json({ success: true, authToken: token, userId: userdata.id });
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
        const user = await User.findOne({ email }, 'name username description avatar');
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const updateAvatar = async (req, res) => {
    const { email, avatar } = req.body;

    try {
        
        const user = await User.findOneAndUpdate(
            { email: email },  
            { avatar: avatar },  
            { new: true } 
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Avatar updated successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Server error'});
    }
};

const getavatarbyemail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!validateEmail(email)) {
            return res.status(400).json({ error: "Email is not valid" });
        }

        const user = await User.findOne({ email:email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        res.json({ avatar: user.avatar });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const deleteAccount = async (req, res) => {
    try {
        const { email } = req.params;

        if (!validateEmail(email)) {
            return res.status(400).json({ error: "Email is not valid" });
        }

        const user = await User.findOneAndDelete({ email: email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const followUser = async (req, res) => {
    try {
        const { userId, followedUserId } = req.params;
        await User.findByIdAndUpdate(userId, {
            $addToSet: { followedIds: followedUserId } // Ensure the ID is added only once
        });
        res.status(200).json({ message: 'User followed successfully' });
    } catch (error) {
        console.error('Error following user:', error);
        res.status(500).json({ message: 'Error following user', error });
    }
};

const removeFollowedUser = async (req, res) => {
    try {
        const { userId, followedUserId } = req.params;
        await User.findByIdAndUpdate(userId, {
            $pull: { followedIds: followedUserId } // Remove the ID from the array
        });
        res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
        console.error('Error unfollowing user:', error);
        res.status(500).json({ message: 'Error unfollowing user', error });
    }
};

const getFollowedUsers = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate({
            path: 'followedIds',
            select: 'name username email' // Only select the name and username fields
        });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user.followedIds);
    } catch (error) {
        console.error('Error fetching followed users:', error);
        res.status(500).json({ message: 'Error fetching followed users', error });
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
    getUserDetailsByEmail,
    updateAvatar,
    getavatarbyemail,
    deleteAccount,
    followUser,
    removeFollowedUser,
    getFollowedUsers,
    uniqueusername,
    loginusergoogle
};
