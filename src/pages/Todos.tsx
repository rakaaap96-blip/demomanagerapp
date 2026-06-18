import { useState } from "react";
import { ListTodo, Plus } from "lucide-react";
import Modal from "../components/Modal";
import { useConfirm } from "../hooks/useConfirm";

interface Todo { id: number; title: string; description: string | null; done: boolean; dueDate: string | null; createdAt: string; }

export default function Todos() {
  const [todos] = useState<Todo[]>([]);
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");
  const confirm = useConfirm();

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  const toggleDone = async (id: number, current: boolean) => {
    alert(`Fitur demo: ${current ? "membatalkan" : "menandai"} todo`);
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>To-Do List</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <select value={filter} onChange={(e) => setFilter(e.target.value as any)} style={{ width: "auto", padding: "6px 12px" }}>
              <option value="all">Semua</option>
              <option value="active">Aktif</option>
              <option value="done">Selesai</option>
            </select>
            <button className="btn btn-primary" onClick={() => setShow(true)}><Plus size={16} />Tambah</button>
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <ListTodo size={48} />
            <p>Belum ada todo. Buat todo baru untuk memulai.</p>
          </div>
        ) : (
          <div>
            {filtered.map((t) => (
              <div key={t.id} className="todo-item">
                <input type="checkbox" className="todo-checkbox" checked={t.done} onChange={() => toggleDone(t.id, t.done)} />
                <div className="todo-content">
                  <div className={`todo-title ${t.done ? "done" : ""}`}>{t.title}</div>
                  {t.description && <div className="todo-desc">{t.description}</div>}
                  {t.dueDate && <div className="todo-due">{t.dueDate}</div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal open={show} title="Tambah Todo" onClose={() => setShow(false)}>
        <p style={{ textAlign: "center", color: "var(--text-muted)", padding: 24 }}>Fitur demo</p>
      </Modal>
    </div>
  );
}
