import { useEffect, useState } from "react";
import api, { errMsg } from "../api/api.js";

export default function AnnouncementsManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", message: "" });
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState("");
  const load = () => api.get("/announcements").then((r) => setItems(r.data));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editId) await api.put(`/announcements/${editId}`, form);
      else await api.post("/announcements", form);
      setForm({ title: "", message: "" }); setEditId(null); setMsg(""); load();
    } catch (err) { setMsg(errMsg(err)); }
  };
  const remove = async (id) => { if (confirm("Delete this announcement?")) { await api.delete(`/announcements/${id}`); load(); } };

  return (
    <div>
      <h2>Announcement Management</h2>
      <form className="card form" onSubmit={submit}>
        <input placeholder="Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <textarea placeholder="Message" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        <div className="row">
          <button className="btn" type="submit">{editId ? "Update" : "Post Announcement"}</button>
          {editId && <button type="button" className="btn btn-outline" onClick={() => { setEditId(null); setForm({ title: "", message: "" }); }}>Cancel</button>}
        </div>
        {msg && <p className="error">{msg}</p>}
      </form>
      {items.map((a) => (
        <div className="card" key={a._id}>
          <h3>{a.title}</h3><p>{a.message}</p>
          <small className="muted">{new Date(a.createdAt).toLocaleString()}</small>
          <div className="row">
            <button className="btn btn-sm" onClick={() => { setEditId(a._id); setForm({ title: a.title, message: a.message }); window.scrollTo(0, 0); }}>Edit</button>
            <button className="btn btn-sm btn-danger" onClick={() => remove(a._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
