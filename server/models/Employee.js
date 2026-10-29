const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  department: String,
  designation: String,
  salary: Number,
  joiningDate: { type: Date, default: Date.now },
  address: String,
}, { timestamps: true });
module.exports = mongoose.model("Employee", employeeSchema);
