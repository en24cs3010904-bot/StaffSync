const Attendance = require("../models/Attendance");
const today = () => new Date().toISOString().slice(0, 10);

exports.checkIn = async (req, res) => {
  try {
    const rec = await Attendance.create({ user: req.user._id, date: today(), status: "Present", checkIn: new Date() });
    res.status(201).json(rec);
  } catch (e) {
    res.status(400).json({ message: e.code === 11000 ? "Already checked in today" : e.message });
  }
};

exports.checkOut = async (req, res) => {
  const rec = await Attendance.findOne({ user: req.user._id, date: today() });
  if (!rec) return res.status(400).json({ message: "You have not checked in today" });
  rec.checkOut = new Date();
  await rec.save();
  res.json(rec);
};

exports.myAttendance = async (req, res) =>
  res.json(await Attendance.find({ user: req.user._id }).sort({ date: -1 }));

// HR: summary per employee + records for a given date
exports.summary = async (req, res) => {
  const date = req.query.date || today();
  const records = await Attendance.find({ date }).populate("user", "name email");
  const all = await Attendance.aggregate([
    { $group: { _id: "$user", present: { $sum: { $cond: [{ $eq: ["$status", "Present"] }, 1, 0] } }, total: { $sum: 1 } } },
    { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
    { $unwind: "$user" },
    { $project: { name: "$user.name", email: "$user.email", present: 1, total: 1 } },
  ]);
  res.json({ date, records, overall: all });
};
