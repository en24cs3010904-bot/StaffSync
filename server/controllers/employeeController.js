const bcrypt = require("bcryptjs");
const Employee = require("../models/Employee");
const User = require("../models/User");

exports.getEmployees = async (req, res) => res.json(await Employee.find().sort({ createdAt: -1 }));

exports.getMyProfile = async (req, res) => {
  let emp = await Employee.findOne({ user: req.user._id });
  if (!emp) emp = await Employee.create({ user: req.user._id, name: req.user.name, email: req.user.email });
  res.json(emp);
};

exports.updateMyProfile = async (req, res) => {
  const { phone, address } = req.body; // employees can only edit contact details
  const emp = await Employee.findOneAndUpdate({ user: req.user._id }, { phone, address }, { new: true });
  res.json(emp);
};

exports.addEmployee = async (req, res) => {
  try {
    const { name, email, password, ...rest } = req.body;
    let user = await User.findOne({ email: (email || "").toLowerCase() });
    if (!user) user = await User.create({ name, email, password: await bcrypt.hash(password || "Welcome@123", 10), role: "employee" });
    const emp = await Employee.create({ user: user._id, name, email, ...rest });
    res.status(201).json(emp);
  } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.updateEmployee = async (req, res) => {
  const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!emp) return res.status(404).json({ message: "Employee not found" });
  res.json(emp);
};

exports.deleteEmployee = async (req, res) => {
  const emp = await Employee.findByIdAndDelete(req.params.id);
  if (!emp) return res.status(404).json({ message: "Employee not found" });
  if (emp.user) await User.findByIdAndDelete(emp.user);
  res.json({ message: "Employee deleted" });
};
