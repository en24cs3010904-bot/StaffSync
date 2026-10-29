const Leave = require("../models/Leave");

exports.applyLeave = async (req, res) => {
  try {
    const { leaveType, fromDate, toDate, reason } = req.body;
    if (new Date(toDate) < new Date(fromDate)) return res.status(400).json({ message: "End date is before start date" });
    res.status(201).json(await Leave.create({ user: req.user._id, leaveType, fromDate, toDate, reason }));
  } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.myLeaves = async (req, res) => res.json(await Leave.find({ user: req.user._id }).sort({ createdAt: -1 }));

exports.allLeaves = async (req, res) =>
  res.json(await Leave.find().populate("user", "name email role").sort({ createdAt: -1 }));

exports.updateStatus = async (req, res) => {
  const { status, remarks } = req.body;
  if (!["Approved", "Rejected", "Pending"].includes(status)) return res.status(400).json({ message: "Invalid status" });
  const leave = await Leave.findByIdAndUpdate(req.params.id, { status, remarks }, { new: true });
  if (!leave) return res.status(404).json({ message: "Leave not found" });
  res.json(leave);
};
