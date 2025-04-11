const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  company: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Not Applied', 'Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Not Applied', // optional default
  },
  appliedDate: {
    type: Date,
    required: true,
  },
  link: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);