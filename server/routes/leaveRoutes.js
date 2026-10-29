const r = require("express").Router();
const c = require("../controllers/leaveController");
const { protect, authorize } = require("../middleware/authMiddleware");
r.use(protect);
r.post("/", c.applyLeave);
r.get("/my", c.myLeaves);
r.get("/", authorize("hr", "manager"), c.allLeaves);
r.put("/:id", authorize("hr", "manager"), c.updateStatus);
module.exports = r;
