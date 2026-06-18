import { useState } from "react";
import { DollarSign, Plus, Archive } from "lucide-react";
import Modal from "../components/Modal";
import ArchiveModal from "../components/ArchiveModal";
import { useConfirm } from "../hooks/useConfirm";

interface TravelMoney { id: number; driverId: number; driverName: string; totalAmount: number; paidAmount: number; kasbonDeduction: number; remaining: number; description: string | null; status: string; requestDate: string; approvalStatus: string; archived?: number; archivedAt?: string | null; }

export default function TravelMoneyPage() {
  const [data] = useState<TravelMoney[]>([]);
  const [archived] = useState<TravelMoney[]>([]);
  const [show, setShow] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const confirm = useConfirm();

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>Uang Jalan</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-outline" onClick={() => setShowArchive(true)}><Archive size={16} /> Arsip</button>
            <button className="btn btn-primary" onClick={() => setShow(true)}><Plus size={16} />Tambah</button>
          </div>
        </div>
        <div className="table-wrapper compact-table">
          <table>
            <thead>
              <tr><th>Driver</th><th>Total</th><th>Dibayar</th><th>Pot. Kasbon</th><th>Sisa</th><th>Status</th><th>Approval</th><th>Tgl</th><th style={{ width: 80 }}>Aksi</th></tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr><td colSpan={9}><div className="empty-state"><DollarSign size={48} /><p>Belum ada data uang jalan</p></div></td></tr>
              ) : (
                data.map((d) => (
                  <tr key={d.id}>
                    <td><strong>{d.driverName}</strong></td>
                    <td>{d.totalAmount.toLocaleString("id-ID")}</td>
                    <td>{d.paidAmount.toLocaleString("id-ID")}</td>
                    <td>{d.kasbonDeduction.toLocaleString("id-ID")}</td>
                    <td style={{ fontWeight: 600 }}>{d.remaining.toLocaleString("id-ID")}</td>
                    <td><span className={`badge ${d.status === "Lunas" ? "badge-success" : "badge-warning"}`}>{d.status}</span></td>
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

      <Modal open={show} title="Tambah Uang Jalan" onClose={() => setShow(false)}>
        <p style={{ textAlign: "center", color: "var(--text-muted)", padding: 24 }}>Fitur demo</p>
      </Modal>

      <ArchiveModal open={showArchive} title="Arsip Uang Jalan" onClose={() => setShowArchive(false)} archived={archived} columns={[
        { key: "driverName", label: "Driver", render: (r) => r.driverName },
        { key: "totalAmount", label: "Total", render: (r) => (r.totalAmount || 0).toLocaleString("id-ID") },
      ]} onRestore={async () => { alert("Fitur demo: mengembalikan arsip"); }} />
    </div>
  );
}
