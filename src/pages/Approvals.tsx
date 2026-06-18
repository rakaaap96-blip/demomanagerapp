import { useState } from "react";
import { CheckSquare, CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useConfirm } from "../hooks/useConfirm";
import type { Approval } from "../types";

export default function Approvals() {
  const [approvals] = useState<Approval[]>([]);
  const confirm = useConfirm();

  const approve = async (id: number) => {
    if (!(await confirm({ message: "Setujui permintaan ini?", variant: "warning" }))) return;
    alert("Fitur demo: menyetujui");
  };

  const reject = async (id: number) => {
    if (!(await confirm({ message: "Tolak permintaan ini?", variant: "danger" }))) return;
    alert("Fitur demo: menolak");
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>Persetujuan</h3>
        </div>
        {approvals.length === 0 ? (
          <div className="empty-state">
            <CheckSquare size={48} />
            <p>Tidak ada permintaan menunggu persetujuan</p>
          </div>
        ) : (
          <div className="table-wrapper compact-table">
            <table>
              <thead>
                <tr><th>Tipe</th><th>Deskripsi</th><th>Pemohon</th><th>Tgl</th><th>Status</th><th style={{ width: 160 }}>Aksi</th></tr>
              </thead>
              <tbody>
                {approvals.map((a) => (
                  <tr key={a.id}>
                    <td><span className="badge badge-info">{a.entityType}</span></td>
                    <td>{a.description}</td>
                    <td>{a.requesterName || "—"}</td>
                    <td>{a.requestDate?.slice(0, 10)}</td>
                    <td><span className={`badge ${a.status === "Disetujui" ? "badge-success" : a.status === "Pending" ? "badge-warning" : "badge-danger"}`}>{a.status}</span></td>
                    <td>
                      {a.status === "Pending" && (
                        <div style={{ display: "flex", gap: 4 }}>
                          <button className="btn btn-ghost btn-sm" style={{ color: "var(--success)" }} onClick={() => approve(a.id)}>
                            <CheckCircle size={14} /> Setuju
                          </button>
                          <button className="btn btn-ghost btn-sm" style={{ color: "var(--danger)" }} onClick={() => reject(a.id)}>
                            <XCircle size={14} /> Tolak
                          </button>
                        </div>
                      )}
                    </td>
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
