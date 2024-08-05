const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,  // Use 'String' instead of 'string'
        required: false  // Make the name field optional
    },
    email: {
        type: String,  // Use 'String' instead of 'string'
        required: true,
        unique: true  // Ensure email is unique
    },
    password: {
        type: String,  // Use 'String' instead of 'string'
        required: true
    },
    username: {
        type: String,  // Add 'username' field
        required: false,
        unique: true  // Ensure username is unique
    },
    description: {
        type: String,  // Add 'description' field
        required: false
    }
});

module.exports = mongoose.model('User', userSchema);
