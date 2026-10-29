import { useEffect, useState } from "react";
import api from "../api/api.js";

export default function Announcements() {
  const [items, setItems] = useState([]);
  useEffect(() => { api.get("/announcements").then((r) => setItems(r.data)); }, []);
  return (
    <div>
      <h2>Company Announcements</h2>
      {items.length === 0 && <p className="muted">No announcements yet.</p>}
      {items.map((a) => (
        <div className="card" key={a._id}>
          <h3>{a.title}</h3>
          <p>{a.message}</p>
          <small className="muted">{a.postedBy?.name || "HR"} · {new Date(a.createdAt).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
}
