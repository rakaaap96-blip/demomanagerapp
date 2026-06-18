import { useState } from "react";
import { FileText, Plus, Archive } from "lucide-react";
import Modal from "../components/Modal";
import ArchiveModal from "../components/ArchiveModal";
interface TravelPermit { id: number; driverId: number; driverName: string; vehicleId: number | null; vehiclePlate: string | null; destination: string; purpose: string | null; startDate: string; endDate: string; status: string; approvedBy: number | null; approvalDate: string | null; notes: string | null; createdAt: string; archived?: number; archivedAt?: string | null; }

export default function TravelPermits() {
  const [data] = useState<TravelPermit[]>([]);
  const [archived] = useState<TravelPermit[]>([]);
  const [show, setShow] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>Surat Izin Jalan</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-outline" onClick={() => setShowArchive(true)}><Archive size={16} /> Arsip</button>
            <button className="btn btn-primary" onClick={() => setShow(true)}><Plus size={16} />Tambah</button>
          </div>
        </div>
        <div className="table-wrapper compact-table">
          <table>
            <thead>
              <tr><th>Driver</th><th>Kendaraan</th><th>Tujuan</th><th>Mulai</th><th>Selesai</th><th>Status</th><th>Catatan</th><th style={{ width: 80 }}>Aksi</th></tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr><td colSpan={8}><div className="empty-state"><FileText size={48} /><p>Belum ada SIJ</p></div></td></tr>
              ) : (
                data.map((d) => (
                  <tr key={d.id}>
                    <td><strong>{d.driverName}</strong></td>
                    <td>{d.vehiclePlate || "—"}</td>
                    <td>{d.destination}</td>
                    <td>{d.startDate?.slice(0, 10)}</td>
                    <td>{d.endDate?.slice(0, 10)}</td>
                    <td><span className={`badge ${d.status === "Disetujui" ? "badge-success" : d.status === "Pending" ? "badge-warning" : "badge-danger"}`}>{d.status}</span></td>
                    <td style={{ color: "var(--text-muted)", maxWidth: 150 }}>{d.notes || "—"}</td>
                    <td><button className="btn btn-ghost btn-sm">Edit</button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={show} title="Tambah SIJ" onClose={() => setShow(false)}>
        <p style={{ textAlign: "center", color: "var(--text-muted)", padding: 24 }}>Fitur demo</p>
      </Modal>

      <ArchiveModal open={showArchive} title="Arsip SIJ" onClose={() => setShowArchive(false)} archived={archived} columns={[
        { key: "driverName", label: "Driver", render: (r) => r.driverName },
        { key: "destination", label: "Tujuan", render: (r) => r.destination },
      ]} onRestore={async () => { alert("Fitur demo: mengembalikan arsip"); }} />
    </div>
  );
}
