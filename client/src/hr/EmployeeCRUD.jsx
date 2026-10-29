import { useEffect, useState } from "react";
import api, { errMsg } from "../api/api.js";

const empty = { name: "", email: "", password: "", phone: "", department: "", designation: "", salary: "" };

export default function EmployeeCRUD() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState("");
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const load = () => api.get("/employees").then((r) => setList(r.data));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editId) { const { password, ...rest } = form; await api.put(`/employees/${editId}`, rest); }
      else await api.post("/employees", form);
      setForm(empty); setEditId(null); setMsg(""); load();
    } catch (err) { setMsg(errMsg(err)); }
  };
  const edit = (e) => { setEditId(e._id); setForm({ ...empty, ...e, salary: e.salary ?? "" }); window.scrollTo(0, 0); };
  const remove = async (id) => { if (confirm("Delete this employee?")) { await api.delete(`/employees/${id}`); load(); } };

  return (
    <div>
      <h2>Employee Management</h2>
      <form className="card form grid" onSubmit={submit}>
        <input placeholder="Name" required value={form.name} onChange={set("name")} />
        <input type="email" placeholder="Email" required value={form.email} onChange={set("email")} disabled={!!editId} />
        {!editId && <input type="password" placeholder="Password (default Welcome@123)" value={form.password} onChange={set("password")} />}
        <input placeholder="Phone" value={form.phone} onChange={set("phone")} />
        <input placeholder="Department" value={form.department} onChange={set("department")} />
        <input placeholder="Designation" value={form.designation} onChange={set("designation")} />
        <input type="number" placeholder="Salary" value={form.salary} onChange={set("salary")} />
        <div className="row">
          <button className="btn" type="submit">{editId ? "Update Employee" : "Add Employee"}</button>
          {editId && <button type="button" className="btn btn-outline" onClick={() => { setEditId(null); setForm(empty); }}>Cancel</button>}
        </div>
        {msg && <p className="error">{msg}</p>}
      </form>
      <table>
        <thead><tr><th>Name</th><th>Email</th><th>Department</th><th>Designation</th><th>Phone</th><th>Salary</th><th>Actions</th></tr></thead>
        <tbody>
          {list.map((e) => (
            <tr key={e._id}><td>{e.name}</td><td>{e.email}</td><td>{e.department || "—"}</td><td>{e.designation || "—"}</td><td>{e.phone || "—"}</td><td>{e.salary ?? "—"}</td>
              <td className="row"><button className="btn btn-sm" onClick={() => edit(e)}>Edit</button><button className="btn btn-sm btn-danger" onClick={() => remove(e._id)}>Delete</button></td></tr>
          ))}
          {list.length === 0 && <tr><td colSpan="7" className="muted">No employees yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
