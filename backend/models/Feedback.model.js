const mongoose = require('mongoose');

const feedback = mongoose.Schema({
    email:{
        type:String,
        required: true
    },
    name:{
        type:String,
    },
    description:{
        type:String,
    }
})

module.exports = mongoose.model('Feedback', feedback)