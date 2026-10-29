import { useEffect, useState } from "react";
import api from "../api/api.js";

const fmt = (d) => (d ? new Date(d).toLocaleTimeString() : "—");

export default function AttendanceSummary() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [data, setData] = useState({ records: [], overall: [] });
  useEffect(() => { api.get(`/attendance/summary?date=${date}`).then((r) => setData(r.data)); }, [date]);

  return (
    <div>
      <h2>Attendance Summary</h2>
      <label>Date: <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
      <h3>Records for {date} ({data.records.length} present)</h3>
      <table>
        <thead><tr><th>Employee</th><th>Email</th><th>Status</th><th>Check In</th><th>Check Out</th></tr></thead>
        <tbody>
          {data.records.map((r) => (
            <tr key={r._id}><td>{r.user?.name}</td><td>{r.user?.email}</td><td><span className={`badge ${r.status.replace(" ", "")}`}>{r.status}</span></td><td>{fmt(r.checkIn)}</td><td>{fmt(r.checkOut)}</td></tr>
          ))}
          {data.records.length === 0 && <tr><td colSpan="5" className="muted">No attendance marked for this date.</td></tr>}
        </tbody>
      </table>
      <h3>Overall</h3>
      <table>
        <thead><tr><th>Employee</th><th>Email</th><th>Days Present</th></tr></thead>
        <tbody>
          {data.overall.map((o) => <tr key={o._id}><td>{o.name}</td><td>{o.email}</td><td>{o.present}</td></tr>)}
          {data.overall.length === 0 && <tr><td colSpan="3" className="muted">No data yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
