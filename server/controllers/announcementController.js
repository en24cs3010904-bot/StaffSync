const Announcement = require("../models/Announcement");

exports.getAll = async (req, res) =>
  res.json(await Announcement.find().populate("postedBy", "name").sort({ createdAt: -1 }));

exports.create = async (req, res) => {
  try { res.status(201).json(await Announcement.create({ ...req.body, postedBy: req.user._id })); }
  catch (e) { res.status(400).json({ message: e.message }); }
};

exports.update = async (req, res) => {
  const a = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!a) return res.status(404).json({ message: "Not found" });
  res.json(a);
};

exports.remove = async (req, res) => {
  await Announcement.findByIdAndDelete(req.params.id);
  res.json({ message: "Announcement deleted" });
};
