const mongoose = require("mongoose");

const attendance = new mongoose.Schema({
  date: { type: Date, required: true },
  isPresent: { type: Boolean, default: true },
});

const students = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  attendance: [attendance], // Embedding attendance schema as an array
});

module.exports = mongoose.model("Students", students);
