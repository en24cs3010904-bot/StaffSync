const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employee = require("../models/Employee");

const sign = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
const payload = (u) => ({ id: u._id, name: u.name, email: u.email, role: u.role });

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });
    if (await User.findOne({ email: email.toLowerCase() })) return res.status(400).json({ message: "Email already registered" });
    const user = await User.create({
      name, email, password: await bcrypt.hash(password, 10),
      role: ["employee", "hr", "manager"].includes(role) ? role : "employee",
    });
    if (user.role === "employee") await Employee.create({ user: user._id, name, email });
    res.status(201).json({ token: sign(user._id), user: payload(user) });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: (email || "").toLowerCase() });
    if (!user || !(await bcrypt.compare(password || "", user.password)))
      return res.status(400).json({ message: "Invalid email or password" });
    res.json({ token: sign(user._id), user: payload(user) });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.me = async (req, res) => res.json(payload(req.user));
