import { useState } from "react";
import api, { errMsg } from "../api/api.js";

export default function LeaveApply({ onApplied }) {
  const empty = { leaveType: "Casual", fromDate: "", toDate: "", reason: "" };
  const [form, setForm] = useState(empty);
  const [msg, setMsg] = useState("");
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try { await api.post("/leaves", form); setMsg("Leave request submitted ✔"); setForm(empty); onApplied && onApplied(); }
    catch (err) { setMsg(errMsg(err)); }
  };

  return (
    <form className="card form" onSubmit={submit}>
      <h3>Apply for Leave</h3>
      <select value={form.leaveType} onChange={set("leaveType")}>
        {["Sick", "Casual", "Annual", "Other"].map((t) => <option key={t}>{t}</option>)}
      </select>
      <label>From <input type="date" required value={form.fromDate} onChange={set("fromDate")} /></label>
      <label>To <input type="date" required value={form.toDate} onChange={set("toDate")} /></label>
      <textarea placeholder="Reason" required value={form.reason} onChange={set("reason")} />
      <button className="btn" type="submit">Submit</button>
      {msg && <p className="muted">{msg}</p>}
    </form>
  );
}
