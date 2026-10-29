import DashboardLayout from "../components/DashboardLayout.jsx";
import Announcements from "../employee/Announcements.jsx";
import Attendance from "../employee/Attendance.jsx";
import LeaveList from "../employee/LeaveList.jsx";
import Profile from "../employee/Profile.jsx";

export default function EmployeeDashboard() {
  return (
    <DashboardLayout title="Employee Dashboard" tabs={[
      { key: "ann", label: "📢 Announcements", element: <Announcements /> },
      { key: "leaves", label: "🌴 Leaves", element: <LeaveList /> },
      { key: "att", label: "🕒 Attendance", element: <Attendance /> },
      { key: "profile", label: "👤 Profile", element: <Profile /> },
    ]} />
  );
}
