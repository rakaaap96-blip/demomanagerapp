import { useState } from "react";
import { FileText, Plus, Archive } from "lucide-react";
import Modal from "../components/Modal";
import ArchiveModal from "../components/ArchiveModal";
import { useConfirm } from "../hooks/useConfirm";

interface ProofOfDelivery { id: number; clientId: number; clientName: string; invoiceId: number | null; invoiceNumber: string | null; driverName: string | null; totalOrders: number; status: string; notes: string | null; createdAt: string; receivedAt: string | null; archived?: number; archivedAt?: string | null; }

export default function ProofOfDeliveryPage() {
  const [data] = useState<ProofOfDelivery[]>([]);
  const [archived] = useState<ProofOfDelivery[]>([]);
  const [show, setShow] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const confirm = useConfirm();

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>Proof of Delivery</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-outline" onClick={() => setShowArchive(true)}><Archive size={16} /> Arsip</button>
            <button className="btn btn-primary" onClick={() => setShow(true)}><Plus size={16} />Tambah</button>
          </div>
        </div>
        <div className="table-wrapper compact-table">
          <table>
            <thead>
              <tr><th>Klien</th><th>Invoice</th><th>Driver</th><th>Orders</th><th>Status</th><th>Dibuat</th><th>Diterima</th><th style={{ width: 80 }}>Aksi</th></tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr><td colSpan={8}><div className="empty-state"><FileText size={48} /><p>Belum ada POD</p></div></td></tr>
              ) : (
                data.map((d) => (
                  <tr key={d.id}>
                    <td><strong>{d.clientName}</strong></td>
                    <td>{d.invoiceNumber || "—"}</td>
                    <td>{d.driverName || "—"}</td>
                    <td>{d.totalOrders}</td>
                    <td><span className={`badge ${d.status === "Diterima" ? "badge-success" : d.status === "Dikirim" ? "badge-info" : "badge-warning"}`}>{d.status}</span></td>
                    <td>{d.createdAt?.slice(0, 10)}</td>
                    <td>{d.receivedAt?.slice(0, 10) || "—"}</td>
                    <td><button className="btn btn-ghost btn-sm">Edit</button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={show} title="Tambah POD" onClose={() => setShow(false)}>
        <p style={{ textAlign: "center", color: "var(--text-muted)", padding: 24 }}>Fitur demo</p>
      </Modal>

      <ArchiveModal open={showArchive} title="Arsip POD" onClose={() => setShowArchive(false)} archived={archived} columns={[
        { key: "clientName", label: "Klien", render: (r) => r.clientName },
        { key: "status", label: "Status", render: (r) => r.status },
      ]} onRestore={async () => { alert("Fitur demo: mengembalikan arsip"); }} />
    </div>
  );
}
