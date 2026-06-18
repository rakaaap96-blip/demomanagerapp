import { useState } from "react";
import { FileText, Plus, Archive } from "lucide-react";
import { useConfirm } from "../hooks/useConfirm";
import Modal from "../components/Modal";
import ArchiveModal from "../components/ArchiveModal";
import type { Invoice } from "../types";

function StatusBadge({ status }: { status: string }) {
  const cls = status === "Lunas" ? "badge-success" : status === "Angsuran" ? "badge-warning" : "badge-danger";
  return <span className={`badge ${cls}`}>{status}</span>;
}

export default function Invoices() {
  const [invoices] = useState<Invoice[]>([]);
  const [showInv, setShowInv] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [archived] = useState<Invoice[]>([]);
  const [filterStatus, setFilterStatus] = useState("");
  const confirm = useConfirm();

  const filtered = invoices.filter((inv) => {
    if (filterStatus && inv.status !== filterStatus) return false;
    return true;
  });

  const archiveSelected = async () => {
    if (!(await confirm({ message: "Arsipkan data invoice?" }))) return;
    alert("Fitur demo: mengarsipkan invoice");
  };

  return (
    <div className="page-container">
      <div className="card">
        <div className="card-header">
          <h3>Invoice</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-outline" onClick={() => setShowArchive(true)}><Archive size={16} /> Tampilkan Arsip</button>
            <button className="btn btn-primary" onClick={archiveSelected}>Arsipkan</button>
            <button className="btn btn-primary" onClick={() => setShowInv(true)}><Plus size={16} />Invoice Baru</button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, padding: "0 24px 16px", alignItems: "center" }}>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ maxWidth: 160 }}>
            <option value="">Semua Status</option>
            <option value="Piutang">Piutang</option>
            <option value="Angsuran">Angsuran</option>
            <option value="Lunas">Lunas</option>
          </select>
        </div>

        <div className="table-wrapper compact-table">
          <table>
            <thead>
              <tr><th style={{ width: 40 }}><input type="checkbox" disabled /></th><th>ID</th><th>Klien</th><th>Total</th><th>Dibyr</th><th>Sisa</th><th>Sts</th><th>DO</th><th>Aksi</th></tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={9}><div className="empty-state"><FileText size={48} /><p>Belum ada invoice</p></div></td></tr>
              ) : (
                filtered.map((inv) => (
                  <tr key={inv.id}>
                    <td><input type="checkbox" disabled /></td>
                    <td style={{ fontWeight: 600 }}>#{inv.id}</td>
                    <td>{inv.clientName || `Klien #${inv.clientId}`}</td>
                    <td>{inv.total.toLocaleString("id-ID")}</td>
                    <td>{inv.paid.toLocaleString("id-ID")}</td>
                    <td style={{ fontWeight: 600 }}>{Math.max(0, inv.total - inv.paid).toLocaleString("id-ID")}</td>
                    <td><StatusBadge status={inv.status} /></td>
                    <td>{inv.attachedDeliveryOrders}</td>
                    <td><button className="btn btn-ghost btn-sm">Bayar</button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ArchiveModal open={showArchive} title="Tampilkan Arsip — Invoice" onClose={() => setShowArchive(false)} archived={archived} columns={[
        { key: "id", label: "ID", render: (r) => `#${r.id}` },
        { key: "total", label: "Total", render: (r) => (r.total || 0).toLocaleString("id-ID") },
      ]} onRestore={async () => { alert("Fitur demo: mengembalikan arsip"); }} />

      <Modal open={showInv} title="Invoice Baru" onClose={() => setShowInv(false)}>
        <p style={{ textAlign: "center", color: "var(--text-muted)", padding: 24 }}>Fitur demo</p>
      </Modal>
    </div>
  );
}
