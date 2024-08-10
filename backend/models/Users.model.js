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
    },
    avatar: {
        type: String,  // Store the avatar URL or image path
        required: false
    },
    upvoteIds: [{
        type: mongoose.Schema.Types.ObjectId,  // Use ObjectId for referencing editors
        ref: 'Editor'  // Reference to the Editor model
    }],
    downvoteIds: [{
        type: mongoose.Schema.Types.ObjectId,  // Use ObjectId for referencing editors
        ref: 'Editor'  // Reference to the Editor model
    }]
});

module.exports = mongoose.model('User', userSchema);
