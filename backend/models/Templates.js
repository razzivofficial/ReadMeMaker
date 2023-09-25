const mongoose = require("mongoose");
const TemplatesSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
  comments: {
    type: Number,
  },
  downloads: {
    type: Number,
  },
  ratings: {
    type: Number,
  },
  previewImg: {
    type: Image,
  },
});

const Templates = mongoose.model("Templates", TemplatesSchema);
module.exports = Templates;
