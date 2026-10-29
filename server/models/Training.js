const mongoose = require("mongoose");
const trainingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  startDate: Date,
  endDate: Date,
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["Planned", "Ongoing", "Completed"], default: "Planned" },
}, { timestamps: true });
module.exports = mongoose.model("Training", trainingSchema);
