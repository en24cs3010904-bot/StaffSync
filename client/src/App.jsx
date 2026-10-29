import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./components/Landing.jsx";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";
import HrDashboard from "./pages/HrDashboard.jsx";
import ManagerDashboard from "./pages/ManagerDashboard.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/employee" element={<ProtectedRoute role="employee"><EmployeeDashboard /></ProtectedRoute>} />
      <Route path="/hr" element={<ProtectedRoute role="hr"><HrDashboard /></ProtectedRoute>} />
      <Route path="/manager" element={<ProtectedRoute role="manager"><ManagerDashboard /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
