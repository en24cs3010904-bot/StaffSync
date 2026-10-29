import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

// tabs = [{ key, label, element }]
export default function DashboardLayout({ title, tabs }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState(tabs[0].key);
  const current = tabs.find((t) => t.key === active);

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2 className="brand">Staff<span>Sync</span></h2>
        <nav>
          {tabs.map((t) => (
            <button key={t.key} className={active === t.key ? "nav-btn active" : "nav-btn"} onClick={() => setActive(t.key)}>
              {t.label}
            </button>
          ))}
        </nav>
        <button className="nav-btn logout" onClick={() => { logout(); navigate("/"); }}>Logout</button>
      </aside>
      <main className="content">
        <header className="topbar">
          <h1>{title}</h1>
          <span className="user-chip">{user.name} · {user.role.toUpperCase()}</span>
        </header>
        <section key={active}>{current.element}</section>
      </main>
    </div>
  );
}
