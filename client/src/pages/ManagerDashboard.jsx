import DashboardLayout from "../components/DashboardLayout.jsx";
import LeaveApplications from "../manager/LeaveApplications.jsx";
import TrainingManagement from "../manager/TrainingManagement.jsx";
import AttendanceSummary from "../hr/AttendanceSummary.jsx";

export default function ManagerDashboard() {
  return (
    <DashboardLayout title="Manager Dashboard" tabs={[
      { key: "leaves", label: "🌴 Leave Approvals", element: <LeaveApplications /> },
      { key: "training", label: "🎓 Training System", element: <TrainingManagement /> },
      { key: "att", label: "📊 Attendance Report", element: <AttendanceSummary /> },
    ]} />
  );
}
