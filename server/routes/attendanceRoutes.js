const r = require("express").Router();
const c = require("../controllers/attendanceController");
const { protect, authorize } = require("../middleware/authMiddleware");
r.use(protect);
r.post("/checkin", c.checkIn);
r.post("/checkout", c.checkOut);
r.get("/my", c.myAttendance);
r.get("/summary", authorize("hr", "manager"), c.summary);
module.exports = r;
