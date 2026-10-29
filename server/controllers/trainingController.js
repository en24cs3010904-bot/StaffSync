const Training = require("../models/Training");
const User = require("../models/User");

exports.getAll = async (req, res) =>
  res.json(await Training.find().populate("assignedTo", "name email").sort({ createdAt: -1 }));

exports.myTraining = async (req, res) =>
  res.json(await Training.find({ assignedTo: req.user._id }).sort({ startDate: 1 }));

exports.employeesList = async (req, res) => res.json(await User.find({ role: "employee" }).select("name email"));

exports.create = async (req, res) => {
  try { res.status(201).json(await Training.create({ ...req.body, createdBy: req.user._id })); }
  catch (e) { res.status(400).json({ message: e.message }); }
};

exports.update = async (req, res) => {
  const t = await Training.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!t) return res.status(404).json({ message: "Not found" });
  res.json(t);
};

exports.remove = async (req, res) => {
  await Training.findByIdAndDelete(req.params.id);
  res.json({ message: "Training deleted" });
};
