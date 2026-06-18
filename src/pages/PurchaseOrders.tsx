import { useState } from "react";
import { ShoppingCart, Plus, Archive } from "lucide-react";
import Modal from "../components/Modal";
import ArchiveModal from "../components/ArchiveModal";
interface PurchaseOrder { id: number; supplierId: number; orderDate: string; expectedDate: string | null; status: string; notes: string | null; createdAt: string; approvalStatus: string; archived?: number; archivedAt?: string | null; }

export default function PurchaseOrders() {
  const [data] = useState<PurchaseOrder[]>([]);
  const [archived] = useState<PurchaseOrder[]>([]);
  const [show, setShow] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>Purchase Order</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-outline" onClick={() => setShowArchive(true)}><Archive size={16} /> Arsip</button>
            <button className="btn btn-primary" onClick={() => setShow(true)}><Plus size={16} />Tambah</button>
          </div>
        </div>
        <div className="table-wrapper compact-table">
          <table>
            <thead>
              <tr><th>ID</th><th>Supplier</th><th>Tgl Order</th><th>Status</th><th>Approval</th><th>Catatan</th><th style={{ width: 100 }}>Aksi</th></tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr><td colSpan={7}><div className="empty-state"><ShoppingCart size={48} /><p>Belum ada PO</p></div></td></tr>
              ) : (
                data.map((d) => (
                  <tr key={d.id}>
                    <td style={{ fontWeight: 600 }}>#{d.id}</td>
                    <td>Supplier #{d.supplierId}</td>
                    <td>{d.orderDate?.slice(0, 10)}</td>
                    <td><span className={`badge ${d.status === "Selesai" ? "badge-success" : d.status === "Dipesan" ? "badge-info" : "badge-warning"}`}>{d.status}</span></td>
                    <td><span className={`badge ${d.approvalStatus === "Disetujui" ? "badge-success" : d.approvalStatus === "Pending" ? "badge-warning" : "badge-danger"}`}>{d.approvalStatus}</span></td>
                    <td style={{ color: "var(--text-muted)", maxWidth: 150 }}>{d.notes || "—"}</td>
                    <td><button className="btn btn-ghost btn-sm">Edit</button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={show} title="Tambah PO" onClose={() => setShow(false)}>
        <p style={{ textAlign: "center", color: "var(--text-muted)", padding: 24 }}>Fitur demo</p>
      </Modal>

      <ArchiveModal open={showArchive} title="Arsip PO" onClose={() => setShowArchive(false)} archived={archived} columns={[
        { key: "id", label: "ID", render: (r) => `#${r.id}` },
        { key: "status", label: "Status", render: (r) => r.status },
      ]} onRestore={async () => { alert("Fitur demo: mengembalikan arsip"); }} />
    </div>
  );
}
