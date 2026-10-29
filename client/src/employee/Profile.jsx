import { useEffect, useState } from "react";
import api, { errMsg } from "../api/api.js";

export default function Profile() {
  const [p, setP] = useState(null);
  const [msg, setMsg] = useState("");
  const [training, setTraining] = useState([]);
  useEffect(() => {
    api.get("/employees/me").then((r) => setP(r.data));
    api.get("/training/my").then((r) => setTraining(r.data));
  }, []);
  if (!p) return <p>Loading…</p>;

  const save = async (e) => {
    e.preventDefault();
    try { const { data } = await api.put("/employees/me", { phone: p.phone, address: p.address }); setP(data); setMsg("Profile updated ✔"); }
    catch (err) { setMsg(errMsg(err)); }
  };

  return (
    <div>
      <h2>My Profile</h2>
      <form className="card form" onSubmit={save}>
        <p><b>Name:</b> {p.name}</p>
        <p><b>Email:</b> {p.email}</p>
        <p><b>Department:</b> {p.department || "Not assigned"}</p>
        <p><b>Designation:</b> {p.designation || "Not assigned"}</p>
        <input placeholder="Phone" value={p.phone || ""} onChange={(e) => setP({ ...p, phone: e.target.value })} />
        <input placeholder="Address" value={p.address || ""} onChange={(e) => setP({ ...p, address: e.target.value })} />
        <button className="btn" type="submit">Save</button>
        {msg && <p className="muted">{msg}</p>}
      </form>
      <h3>My Training Programs</h3>
      {training.length === 0 && <p className="muted">No training assigned.</p>}
      {training.map((t) => (
        <div className="card" key={t._id}><h3>{t.title}</h3><p>{t.description}</p>
          <small className="muted">{t.startDate ? new Date(t.startDate).toLocaleDateString() : "TBD"} → {t.endDate ? new Date(t.endDate).toLocaleDateString() : "TBD"} · {t.status}</small></div>
      ))}
    </div>
  );
}
