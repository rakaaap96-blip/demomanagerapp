import { useState } from "react";
import { History } from "lucide-react";
import type { AuditLog } from "../types";

export default function AuditLogs() {
  const [logs] = useState<AuditLog[]>([]);
  const [filterAction, setFilterAction] = useState("");

  const filtered = logs.filter((l) => {
    if (filterAction && l.action !== filterAction) return false;
    return true;
  });

  const actions = [...new Set(logs.map((l) => l.action))];

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>Riwayat Aktivitas</h3>
          <select value={filterAction} onChange={(e) => setFilterAction(e.target.value)} style={{ maxWidth: 180 }}>
            <option value="">Semua Aksi</option>
            {actions.map((a) => (<option key={a} value={a}>{a}</option>))}
          </select>
        </div>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <History size={48} />
            <p>Belum ada aktivitas tercatat</p>
          </div>
        ) : (
          <div className="table-wrapper compact-table">
            <table>
              <thead>
                <tr><th>Waktu</th><th>Aksi</th><th>Deskripsi</th></tr>
              </thead>
              <tbody>
                {filtered.map((l) => (
                  <tr key={l.id}>
                    <td style={{ color: "var(--text-muted)" }}>{l.createdAt?.slice(0, 19).replace("T", " ")}</td>
                    <td><span className="badge badge-info">{l.action}</span></td>
                    <td>{l.description || `${l.entityType} #${l.entityId}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
