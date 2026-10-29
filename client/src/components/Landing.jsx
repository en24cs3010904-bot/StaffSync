import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <h2 className="brand">Staff<span>Sync</span></h2>
        <div>
          <Link to="/login" className="btn btn-outline">Login</Link>
          <Link to="/register" className="btn">Register</Link>
        </div>
      </nav>
      <div className="hero">
        <h1>Modern human resource management solution</h1>
        <p>Manage employees, attendance, leaves, announcements and training — all in one place.</p>
        <Link to="/register" className="btn btn-lg">Get Started</Link>
      </div>
      <div className="features">
        {[
          ["👥 Employee Management", "HR can add, edit and remove employee records."],
          ["🕒 Attendance Tracking", "Check in/out daily and view attendance summaries."],
          ["🌴 Leave Management", "Apply for leave and get approvals quickly."],
          ["📢 Announcements", "Keep everyone informed with company news."],
          ["🎓 Training", "Managers plan and assign training programs."],
        ].map(([t, d]) => (
          <div className="card" key={t}><h3>{t}</h3><p>{d}</p></div>
        ))}
      </div>
    </div>
  );
}
