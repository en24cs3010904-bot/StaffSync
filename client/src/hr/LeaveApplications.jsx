import { useEffect, useState } from "react";
import api from "../api/api.js";

const d = (x) => new Date(x).toLocaleDateString();

// Shared by HR and Manager: view all leave requests and approve / reject
export default function LeaveApplications() {
  const [leaves, setLeaves] = useState([]);
  const load = () => api.get("/leaves").then((r) => setLeaves(r.data));
  useEffect(() => { load(); }, []);

  const decide = async (id, status) => {
    const remarks = status === "Rejected" ? prompt("Reason for rejection (optional)") || "" : "";
    await api.put(`/leaves/${id}`, { status, remarks });
    load();
  };

  return (
    <div>
      <h2>Leave Applications</h2>
      <table>
        <thead><tr><th>Employee</th><th>Type</th><th>From</th><th>To</th><th>Reason</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          {leaves.map((l) => (
            <tr key={l._id}><td>{l.user?.name}</td><td>{l.leaveType}</td><td>{d(l.fromDate)}</td><td>{d(l.toDate)}</td><td>{l.reason}</td>
              <td><span className={`badge ${l.status}`}>{l.status}</span></td>
              <td className="row">{l.status === "Pending" ? (<>
                <button className="btn btn-sm" onClick={() => decide(l._id, "Approved")}>Approve</button>
                <button className="btn btn-sm btn-danger" onClick={() => decide(l._id, "Rejected")}>Reject</button></>) : "—"}</td></tr>
          ))}
          {leaves.length === 0 && <tr><td colSpan="7" className="muted">No leave applications.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
