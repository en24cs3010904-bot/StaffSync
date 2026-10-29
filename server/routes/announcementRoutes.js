const r = require("express").Router();
const c = require("../controllers/announcementController");
const { protect, authorize } = require("../middleware/authMiddleware");
r.use(protect);
r.get("/", c.getAll);
r.post("/", authorize("hr"), c.create);
r.put("/:id", authorize("hr"), c.update);
r.delete("/:id", authorize("hr"), c.remove);
module.exports = r;
