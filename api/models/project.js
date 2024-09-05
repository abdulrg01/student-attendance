const mongoose = require("mongoose");

const project = new mongoose.Schema({
  title: { type: String, require: true },
  text: { type: String, require: true },
  jobTitle: { type: String, require: true },
  phone: { type: String, require: true },
  address: { type: String, require: true },
  summery: { type: String, require: true },
  experience: [
    {
      title: { type: String, require: true },
      companyName: { type: String, require: true },
      city: { type: String, require: true },
      state: { type: String, require: true },
      startDate: { type: String, require: true },
      endDate: { type: String, require: true },
      currentlyWorking: { type: Boolean, default: true },
      summery: { type: String, require: true },
      workSummery: { type: String, require: true },
    },
  ],
  education: [
    {
      universityName: { type: String, require: true },
      degree: { type: String, require: true },
      major: { type: String, require: true },
      startDate: { type: String, require: true },
      endDate: { type: String, require: true },
      description: { type: String, require: true },
    },
  ],
  user: { type: Object, require: true },
});

module.exports = mongoose.model("Project", project);
