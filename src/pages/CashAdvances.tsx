import { useState } from "react";
import { DollarSign, Plus, Archive } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import Modal from "../components/Modal";
import ArchiveModal from "../components/ArchiveModal";
import { useConfirm } from "../hooks/useConfirm";

interface CashAdvance { id: number; employeeId: number; employeeName: string; employeeType: string; amount: number; paidAmount: number; remaining: number; disbursedAmount: number; requestDate: string; approvalStatus: string; notes: string | null; createdAt: string; archived?: number; archivedAt?: string | null; }

export default function CashAdvances() {
  const [data] = useState<CashAdvance[]>([]);
  const [archived] = useState<CashAdvance[]>([]);
  const [show, setShow] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const confirm = useConfirm();

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>Kasbon Karyawan</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-outline" onClick={() => setShowArchive(true)}><Archive size={16} /> Arsip</button>
            <button className="btn btn-primary" onClick={() => setShow(true)}><Plus size={16} />Tambah</button>
          </div>
        </div>
        <div className="table-wrapper compact-table">
          <table>
            <thead>
              <tr><th>Karyawan</th><th>Jumlah</th><th>Dibayar</th><th>Sisa</th><th>Status</th><th>Tgl</th><th style={{ width: 100 }}>Aksi</th></tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr><td colSpan={7}><div className="empty-state"><DollarSign size={48} /><p>Belum ada data kasbon</p></div></td></tr>
              ) : (
                data.map((d) => (
                  <tr key={d.id}>
                    <td><strong>{d.employeeName}</strong></td>
                    <td>{d.amount.toLocaleString("id-ID")}</td>
                    <td>{d.paidAmount.toLocaleString("id-ID")}</td>
                    <td style={{ fontWeight: 600 }}>{d.remaining.toLocaleString("id-ID")}</td>
                    <td><span className={`badge ${d.approvalStatus === "Disetujui" ? "badge-success" : d.approvalStatus === "Pending" ? "badge-warning" : "badge-danger"}`}>{d.approvalStatus}</span></td>
                    <td>{d.requestDate?.slice(0, 10)}</td>
                    <td><button className="btn btn-ghost btn-sm">Bayar</button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={show} title="Tambah Kasbon" onClose={() => setShow(false)}>
        <p style={{ textAlign: "center", color: "var(--text-muted)", padding: 24 }}>Fitur demo</p>
      </Modal>

      <ArchiveModal open={showArchive} title="Arsip Kasbon" onClose={() => setShowArchive(false)} archived={archived} columns={[
        { key: "id", label: "ID", render: (r) => `#${r.id}` },
        { key: "employeeName", label: "Karyawan", render: (r) => r.employeeName },
        { key: "amount", label: "Jumlah", render: (r) => (r.amount || 0).toLocaleString("id-ID") },
      ]} onRestore={async () => { alert("Fitur demo: mengembalikan arsip"); }} />
    </div>
  );
}
