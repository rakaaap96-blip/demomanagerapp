import { useState } from "react";
import { DollarSign, Plus, Archive } from "lucide-react";
import Modal from "../components/Modal";
import ArchiveModal from "../components/ArchiveModal";
interface Salary { id: number; employeeId: number; employeeName: string; employeeType: string; amount: number; paidAmount: number; remaining: number; period: string | null; status: string; paymentDate: string | null; notes: string | null; createdAt: string; archived?: number; archivedAt?: string | null; }

export default function Salaries() {
  const [data] = useState<Salary[]>([]);
  const [archived] = useState<Salary[]>([]);
  const [show, setShow] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>Penggajian</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-outline" onClick={() => setShowArchive(true)}><Archive size={16} /> Arsip</button>
            <button className="btn btn-primary" onClick={() => setShow(true)}><Plus size={16} />Tambah</button>
          </div>
        </div>
        <div className="table-wrapper compact-table">
          <table>
            <thead>
              <tr><th>Karyawan</th><th>Jumlah</th><th>Dibayar</th><th>Sisa</th><th>Status</th><th>Periode</th><th>Dibayar</th><th style={{ width: 100 }}>Aksi</th></tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr><td colSpan={8}><div className="empty-state"><DollarSign size={48} /><p>Belum ada data penggajian</p></div></td></tr>
              ) : (
                data.map((d) => (
                  <tr key={d.id}>
                    <td><strong>{d.employeeName}</strong></td>
                    <td>{d.amount.toLocaleString("id-ID")}</td>
                    <td>{d.paidAmount.toLocaleString("id-ID")}</td>
                    <td>{d.remaining.toLocaleString("id-ID")}</td>
                    <td><span className={`badge ${d.status === "Lunas" ? "badge-success" : "badge-warning"}`}>{d.status}</span></td>
                    <td>{d.period || "—"}</td>
                    <td>{d.paymentDate || "—"}</td>
                    <td><button className="btn btn-ghost btn-sm">Bayar</button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={show} title="Tambah Penggajian" onClose={() => setShow(false)}>
        <p style={{ textAlign: "center", color: "var(--text-muted)", padding: 24 }}>Fitur demo</p>
      </Modal>

      <ArchiveModal open={showArchive} title="Arsip Penggajian" onClose={() => setShowArchive(false)} archived={archived} columns={[
        { key: "employeeName", label: "Karyawan", render: (r) => r.employeeName },
        { key: "amount", label: "Jumlah", render: (r) => (r.amount || 0).toLocaleString("id-ID") },
        { key: "period", label: "Periode", render: (r) => r.period || "—" },
      ]} onRestore={async () => { alert("Fitur demo: mengembalikan arsip"); }} />
    </div>
  );
}
