import { useEffect, useState } from "react";
import api, { errMsg } from "../api/api.js";

const empty = { title: "", description: "", startDate: "", endDate: "", status: "Planned", assignedTo: [] };
const day = (x) => (x ? new Date(x).toISOString().slice(0, 10) : "");

export default function TrainingManagement() {
  const [list, setList] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState("");
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const load = () => api.get("/training").then((r) => setList(r.data));
  useEffect(() => { load(); api.get("/training/employees").then((r) => setEmployees(r.data)); }, []);

  const toggle = (id) =>
    setForm({ ...form, assignedTo: form.assignedTo.includes(id) ? form.assignedTo.filter((x) => x !== id) : [...form.assignedTo, id] });

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editId) await api.put(`/training/${editId}`, form); else await api.post("/training", form);
      setForm(empty); setEditId(null); setMsg(""); load();
    } catch (err) { setMsg(errMsg(err)); }
  };
  const edit = (t) => {
    setEditId(t._id);
    setForm({ title: t.title, description: t.description || "", startDate: day(t.startDate), endDate: day(t.endDate), status: t.status, assignedTo: t.assignedTo.map((u) => u._id) });
    window.scrollTo(0, 0);
  };
  const remove = async (id) => { if (confirm("Delete this training?")) { await api.delete(`/training/${id}`); load(); } };

  return (
    <div>
      <h2>Training Management</h2>
      <form className="card form" onSubmit={submit}>
        <input placeholder="Training title" required value={form.title} onChange={set("title")} />
        <textarea placeholder="Description" value={form.description} onChange={set("description")} />
        <div className="row">
          <label>Start <input type="date" value={form.startDate} onChange={set("startDate")} /></label>
          <label>End <input type="date" value={form.endDate} onChange={set("endDate")} /></label>
          <select value={form.status} onChange={set("status")}>{["Planned", "Ongoing", "Completed"].map((s) => <option key={s}>{s}</option>)}</select>
        </div>
        <p><b>Assign to:</b></p>
        <div className="checks">
          {employees.map((u) => (
            <label key={u._id}><input type="checkbox" checked={form.assignedTo.includes(u._id)} onChange={() => toggle(u._id)} /> {u.name}</label>
          ))}
          {employees.length === 0 && <span className="muted">No employees registered yet.</span>}
        </div>
        <div className="row">
          <button className="btn" type="submit">{editId ? "Update Training" : "Create Training"}</button>
          {editId && <button type="button" className="btn btn-outline" onClick={() => { setEditId(null); setForm(empty); }}>Cancel</button>}
        </div>
        {msg && <p className="error">{msg}</p>}
      </form>
      <table>
        <thead><tr><th>Title</th><th>Dates</th><th>Status</th><th>Assigned</th><th>Actions</th></tr></thead>
        <tbody>
          {list.map((t) => (
            <tr key={t._id}><td>{t.title}</td><td>{day(t.startDate) || "TBD"} → {day(t.endDate) || "TBD"}</td><td><span className="badge Pending">{t.status}</span></td>
              <td>{t.assignedTo.map((u) => u.name).join(", ") || "—"}</td>
              <td className="row"><button className="btn btn-sm" onClick={() => edit(t)}>Edit</button><button className="btn btn-sm btn-danger" onClick={() => remove(t._id)}>Delete</button></td></tr>
          ))}
          {list.length === 0 && <tr><td colSpan="5" className="muted">No training programs yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
