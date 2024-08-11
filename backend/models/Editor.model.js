const mongoose = require('mongoose')

const editorSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ['component', 'template'], 
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    username:{
        type:String,
        required: true,
    },
    avatar:{
        type:String
    },
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    tag:{
        type:String,
    },
    upvotes:{
        type:Number,
        default:0,
    },
    downvotes:{
        type:Number,
        default:0,
    },
    markdown:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Editor', editorSchema)