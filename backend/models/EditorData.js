const mongoose = require("mongoose");

const EditorDataSchema = new mongoose.Schema({
  slno: { type: String },
  title: { type: String },
  desc: { type: String },
  code: { type: String },
});

const ElementData = mongoose.model("ElementData", EditorDataSchema);
module.exports = ElementData;
