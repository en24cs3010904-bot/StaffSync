const mongoose = require("mongoose");
const attendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  status: { type: String, enum: ["Present", "Absent", "Half Day"], default: "Present" },
  checkIn: Date,
  checkOut: Date,
}, { timestamps: true });
attendanceSchema.index({ user: 1, date: 1 }, { unique: true });
module.exports = mongoose.model("Attendance", attendanceSchema);
