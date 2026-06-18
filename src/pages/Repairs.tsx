import { useState } from "react";
import { Wrench, Plus, Archive } from "lucide-react";
import Modal from "../components/Modal";
import ArchiveModal from "../components/ArchiveModal";
import { useConfirm } from "../hooks/useConfirm";

interface Repair { id: number; vehicleId: number; mechanicId: number | null; description: string; damageReport: string | null; actionsTaken: string | null; startDate: string | null; endDate: string | null; status: string; totalCost: number; createdAt: string; archived?: number; archivedAt?: string | null; }

const emptyForm = { vehicleId: "", mechanicId: "", description: "", damageReport: "", startDate: "", endDate: "", status: "Antrian", totalCost: "0" };

export default function Repairs() {
  const [repairs] = useState<Repair[]>([]);
  const [archived] = useState<Repair[]>([]);
  const [show, setShow] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [edit, setEdit] = useState<Repair | null>(null);
  const [form, setForm] = useState(emptyForm);
  const confirm = useConfirm();

  const openAdd = () => { setEdit(null); setForm(emptyForm); setShow(true); };
  const openEdit = (r: Repair) => {
    setEdit(r);
    setForm({ vehicleId: String(r.vehicleId), mechanicId: r.mechanicId ? String(r.mechanicId) : "", description: r.description, damageReport: r.damageReport || "", startDate: r.startDate || "", endDate: r.endDate || "", status: r.status, totalCost: String(r.totalCost) });
    setShow(true);
  };

  const save = async () => { alert("Fitur demo: menyimpan perbaikan"); };
  const remove = async (id: number) => {
    if (!(await confirm({ message: "Hapus data perbaikan ini?" }))) return;
    alert("Fitur demo: menghapus perbaikan");
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>Perbaikan & Servis</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-outline" onClick={() => setShowArchive(true)}><Archive size={16} /> Arsip</button>
            <button className="btn btn-primary" onClick={openAdd}><Plus size={16} />Tambah</button>
          </div>
        </div>
        <div className="table-wrapper compact-table">
          <table>
            <thead>
              <tr><th>Kendaraan</th><th>Deskripsi</th><th>Status</th><th>Biaya</th><th>Mulai</th><th>Selesai</th><th style={{ width: 100 }}>Aksi</th></tr>
            </thead>
            <tbody>
              {repairs.length === 0 ? (
                <tr><td colSpan={7}><div className="empty-state"><Wrench size={48} /><p>Belum ada data perbaikan</p></div></td></tr>
              ) : (
                repairs.map((r) => (
                  <tr key={r.id}>
                    <td>#{r.vehicleId}</td>
                    <td style={{ maxWidth: 200 }}>{r.description}</td>
                    <td><span className={`badge ${r.status === "Selesai" ? "badge-success" : r.status === "Dikerjakan" ? "badge-warning" : "badge-danger"}`}>{r.status}</span></td>
                    <td>{r.totalCost.toLocaleString("id-ID")}</td>
                    <td>{r.startDate || "—"}</td>
                    <td>{r.endDate || "—"}</td>
                    <td>
                      <div style={{ display: "flex", gap: 2 }}>
                        <button className="btn btn-ghost btn-sm" onClick={() => openEdit(r)}>Edit</button>
                        <button className="btn btn-ghost btn-sm" style={{ color: "var(--danger)" }} onClick={() => remove(r.id)}>Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={show} title={edit ? "Edit Perbaikan" : "Tambah Perbaikan"} onClose={() => setShow(false)}>
        <div className="form-row">
          <div className="form-group"><label>ID Kendaraan</label><input type="number" value={form.vehicleId} onChange={(e) => setForm({ ...form, vehicleId: e.target.value })} /></div>
          <div className="form-group"><label>ID Mekanik</label><input type="number" value={form.mechanicId} onChange={(e) => setForm({ ...form, mechanicId: e.target.value })} /></div>
        </div>
        <div className="form-group"><label>Deskripsi *</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        <div className="form-row">
          <div className="form-group"><label>Mulai</label><input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} /></div>
          <div className="form-group"><label>Selesai</label><input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Status</label><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option>Antrian</option><option>Dikerjakan</option><option>Selesai</option>
          </select></div>
          <div className="form-group"><label>Total Biaya</label><input type="number" value={form.totalCost} onChange={(e) => setForm({ ...form, totalCost: e.target.value })} /></div>
        </div>
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={() => setShow(false)}>Batal</button>
          <button className="btn btn-primary" onClick={save}>{edit ? "Simpan" : "Tambah"}</button>
        </div>
      </Modal>

      <ArchiveModal open={showArchive} title="Arsip Perbaikan" onClose={() => setShowArchive(false)} archived={archived} columns={[
        { key: "id", label: "ID", render: (r) => `#${r.id}` },
        { key: "description", label: "Deskripsi", render: (r) => r.description },
        { key: "totalCost", label: "Biaya", render: (r) => (r.totalCost || 0).toLocaleString("id-ID") },
      ]} onRestore={async () => { alert("Fitur demo: mengembalikan arsip"); }} />
    </div>
  );
}
