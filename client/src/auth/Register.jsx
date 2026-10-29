import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { errMsg } from "../api/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { dashboardFor } from "../components/ProtectedRoute.jsx";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "employee" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/register", form);
      login(data);
      navigate(dashboardFor(data.user.role));
    } catch (err) { setError(errMsg(err)); }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h2 className="brand">Staff<span>Sync</span></h2>
        <h3>Create account</h3>
        {error && <p className="error">{error}</p>}
        <input placeholder="Full name" required value={form.name} onChange={set("name")} />
        <input type="email" placeholder="Email" required value={form.email} onChange={set("email")} />
        <input type="password" placeholder="Password" required minLength={6} value={form.password} onChange={set("password")} />
        <select value={form.role} onChange={set("role")}>
          <option value="employee">Employee</option>
          <option value="hr">HR</option>
          <option value="manager">Manager</option>
        </select>
        <button className="btn" type="submit">Register</button>
        <p className="muted">Already registered? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
