import { useState } from "react";
import { Bell, Plus, CheckCircle } from "lucide-react";
import Modal from "../components/Modal";
interface Reminder { id: number; title: string; description: string | null; remindAt: string; remindType: string; relatedEntity: string | null; relatedId: number | null; done: boolean; createdAt: string; }

export default function Reminders() {
  const [data] = useState<Reminder[]>([]);
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>Pengingat</h3>
          <button className="btn btn-primary" onClick={() => setShow(true)}><Plus size={16} />Tambah</button>
        </div>
        {data.length === 0 ? (
          <div className="empty-state">
            <Bell size={48} />
            <p>Tidak ada pengingat. Buat pengingat baru untuk memulai.</p>
          </div>
        ) : (
          <div>
            {data.map((r) => (
              <div key={r.id} className="todo-item">
                <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
                  <CheckCircle size={20} style={{ color: r.done ? "var(--success)" : "var(--text-muted)", cursor: "pointer" }} />
                  <div className="todo-content">
                    <div className={`todo-title ${r.done ? "done" : ""}`}>{r.title}</div>
                    {r.description && <div className="todo-desc">{r.description}</div>}
                    <div className="todo-due">{r.remindAt.slice(0, 16).replace("T", " ")}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal open={show} title="Tambah Pengingat" onClose={() => setShow(false)}>
        <p style={{ textAlign: "center", color: "var(--text-muted)", padding: 24 }}>Fitur demo</p>
      </Modal>
    </div>
  );
}
