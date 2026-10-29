import { useEffect, useState } from "react";
import api, { errMsg } from "../api/api.js";

const fmt = (d) => (d ? new Date(d).toLocaleTimeString() : "—");

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [msg, setMsg] = useState("");
  const load = () => api.get("/attendance/my").then((r) => setRecords(r.data));
  useEffect(() => { load(); }, []);

  const act = async (path) => {
    try { await api.post(`/attendance/${path}`); setMsg(path === "checkin" ? "Checked in ✔" : "Checked out ✔"); load(); }
    catch (e) { setMsg(errMsg(e)); }
  };

  return (
    <div>
      <h2>My Attendance</h2>
      <div className="row">
        <button className="btn" onClick={() => act("checkin")}>Check In</button>
        <button className="btn btn-outline" onClick={() => act("checkout")}>Check Out</button>
        {msg && <span className="muted">{msg}</span>}
      </div>
      <table>
        <thead><tr><th>Date</th><th>Status</th><th>Check In</th><th>Check Out</th></tr></thead>
        <tbody>
          {records.map((r) => (
            <tr key={r._id}><td>{r.date}</td><td><span className={`badge ${r.status.replace(" ", "")}`}>{r.status}</span></td><td>{fmt(r.checkIn)}</td><td>{fmt(r.checkOut)}</td></tr>
          ))}
          {records.length === 0 && <tr><td colSpan="4" className="muted">No records yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
