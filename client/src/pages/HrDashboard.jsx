import DashboardLayout from "../components/DashboardLayout.jsx";
import EmployeeCRUD from "../hr/EmployeeCRUD.jsx";
import AnnouncementsManager from "../hr/AnnouncementsManager.jsx";
import AttendanceSummary from "../hr/AttendanceSummary.jsx";
import LeaveApplications from "../hr/LeaveApplications.jsx";

export default function HrDashboard() {
  return (
    <DashboardLayout title="HR Dashboard" tabs={[
      { key: "emp", label: "👥 Employee Management", element: <EmployeeCRUD /> },
      { key: "ann", label: "📢 Announcements", element: <AnnouncementsManager /> },
      { key: "att", label: "🕒 Attendance", element: <AttendanceSummary /> },
      { key: "leaves", label: "🌴 Leave Applications", element: <LeaveApplications /> },
    ]} />
  );
}
