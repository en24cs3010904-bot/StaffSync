import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export const dashboardFor = (role) => (role === "hr" ? "/hr" : role === "manager" ? "/manager" : "/employee");

export default function ProtectedRoute({ role, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to={dashboardFor(user.role)} replace />;
  return children;
}
