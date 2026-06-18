import { useState } from "react";
import { DollarSign, Plus, Archive } from "lucide-react";
import Modal from "../components/Modal";
import ArchiveModal from "../components/ArchiveModal";
interface ExpenseRequest { id: number; title: string; description: string | null; amount: number; paidAmount: number; remaining: number; expenseType: string; status: string; requesterName: string | null; requestDate: string; approvalDate: string | null; notes: string | null; createdAt: string; archived?: number; archivedAt?: string | null; }

export default function ExpenseRequests() {
  const [data] = useState<ExpenseRequest[]>([]);
  const [archived] = useState<ExpenseRequest[]>([]);
  const [show, setShow] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>Pengajuan Biaya</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-outline" onClick={() => setShowArchive(true)}><Archive size={16} /> Arsip</button>
            <button className="btn btn-primary" onClick={() => setShow(true)}><Plus size={16} />Tambah</button>
          </div>
        </div>
        <div className="table-wrapper compact-table">
          <table>
            <thead>
              <tr><th>Judul</th><th>Tipe</th><th>Jumlah</th><th>Dibayar</th><th>Sisa</th><th>Status</th><th>Pemohon</th><th>Tgl</th><th style={{ width: 80 }}>Aksi</th></tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr><td colSpan={9}><div className="empty-state"><DollarSign size={48} /><p>Belum ada pengajuan biaya</p></div></td></tr>
              ) : (
                data.map((d) => (
                  <tr key={d.id}>
                    <td><strong>{d.title}</strong></td>
                    <td>{d.expenseType}</td>
                    <td>{d.amount.toLocaleString("id-ID")}</td>
                    <td>{d.paidAmount.toLocaleString("id-ID")}</td>
                    <td>{d.remaining.toLocaleString("id-ID")}</td>
                    <td><span className={`badge ${d.status === "Disetujui" ? "badge-success" : d.status === "Pending" ? "badge-warning" : "badge-danger"}`}>{d.status}</span></td>
                    <td>{d.requesterName || "—"}</td>
                    <td>{d.requestDate?.slice(0, 10)}</td>
                    <td><button className="btn btn-ghost btn-sm">Bayar</button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={show} title="Tambah Pengajuan Biaya" onClose={() => setShow(false)}>
        <p style={{ textAlign: "center", color: "var(--text-muted)", padding: 24 }}>Fitur demo</p>
      </Modal>

      <ArchiveModal open={showArchive} title="Arsip Pengajuan Biaya" onClose={() => setShowArchive(false)} archived={archived} columns={[
        { key: "title", label: "Judul", render: (r) => r.title },
        { key: "amount", label: "Jumlah", render: (r) => (r.amount || 0).toLocaleString("id-ID") },
      ]} onRestore={async () => { alert("Fitur demo: mengembalikan arsip"); }} />
    </div>
  );
}
