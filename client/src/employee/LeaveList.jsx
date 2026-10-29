import { useEffect, useState } from "react";
import api from "../api/api.js";
import LeaveApply from "./LeaveApply.jsx";

const d = (x) => new Date(x).toLocaleDateString();

export default function LeaveList() {
  const [leaves, setLeaves] = useState([]);
  const load = () => api.get("/leaves/my").then((r) => setLeaves(r.data));
  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2>Leaves</h2>
      <LeaveApply onApplied={load} />
      <h3>My Leave History</h3>
      <table>
        <thead><tr><th>Type</th><th>From</th><th>To</th><th>Reason</th><th>Status</th><th>Remarks</th></tr></thead>
        <tbody>
          {leaves.map((l) => (
            <tr key={l._id}><td>{l.leaveType}</td><td>{d(l.fromDate)}</td><td>{d(l.toDate)}</td><td>{l.reason}</td>
              <td><span className={`badge ${l.status}`}>{l.status}</span></td><td>{l.remarks || "—"}</td></tr>
          ))}
          {leaves.length === 0 && <tr><td colSpan="6" className="muted">No leave requests yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
