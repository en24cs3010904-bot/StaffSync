import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { errMsg } from "../api/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { dashboardFor } from "../components/ProtectedRoute.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", form);
      login(data);
      navigate(dashboardFor(data.user.role));
    } catch (err) { setError(errMsg(err)); }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h2 className="brand">Staff<span>Sync</span></h2>
        <h3>Login</h3>
        {error && <p className="error">{error}</p>}
        <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn" type="submit">Login</button>
        <p className="muted">No account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
}
