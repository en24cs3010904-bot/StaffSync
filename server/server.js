require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("StaffSync API running"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/leaves", require("./routes/leaveRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/announcements", require("./routes/announcementRoutes"));
app.use("/api/training", require("./routes/trainingRoutes"));

const PORT = process.env.PORT || 8000;
// Make sure DB is connected before the server starts accepting requests
connectDB().then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)));
