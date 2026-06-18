import { useState } from "react";
import { Truck, Plus } from "lucide-react";
import Modal from "../components/Modal";
import { useConfirm } from "../hooks/useConfirm";

interface Vehicle {
  id: number;
  plate: string;
  brand: string | null;
  model: string | null;
  year: number | null;
  notes: string | null;
  stnkExpiry: string | null;
  kirExpiry: string | null;
}

const emptyForm = { plate: "", brand: "", model: "", year: "", notes: "", stnkExpiry: "", kirExpiry: "" };

export default function Vehicles() {
  const [vehicles] = useState<Vehicle[]>([]);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState<Vehicle | null>(null);
  const [form, setForm] = useState(emptyForm);
  const confirm = useConfirm();

  const openAdd = () => { setEdit(null); setForm(emptyForm); setShow(true); };
  const openEdit = (v: Vehicle) => {
    setEdit(v);
    setForm({ plate: v.plate, brand: v.brand || "", model: v.model || "", year: String(v.year || ""), notes: v.notes || "", stnkExpiry: v.stnkExpiry || "", kirExpiry: v.kirExpiry || "" });
    setShow(true);
  };

  const save = async () => { alert("Fitur demo: menyimpan kendaraan"); };
  const remove = async (_id: number) => {
    if (!(await confirm({ message: "Hapus kendaraan ini?" }))) return;
    alert("Fitur demo: menghapus kendaraan");
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>Kendaraan</h3>
          <button className="btn btn-primary" onClick={openAdd}><Plus size={16} />Tambah</button>
        </div>
        <div className="table-wrapper compact-table">
          <table>
            <thead>
              <tr>
                <th>Plat</th><th>Merek</th><th>Model</th><th>Tahun</th><th>STNK</th><th>KIR</th><th>Catatan</th><th style={{ width: 100 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.length === 0 ? (
                <tr><td colSpan={8}><div className="empty-state"><Truck size={48} /><p>Belum ada data kendaraan</p></div></td></tr>
              ) : (
                vehicles.map((v) => (
                  <tr key={v.id}>
                    <td><strong>{v.plate}</strong></td>
                    <td>{v.brand || "—"}</td>
                    <td>{v.model || "—"}</td>
                    <td>{v.year || "—"}</td>
                    <td>{v.stnkExpiry ? <span className="badge badge-warning">{v.stnkExpiry}</span> : "—"}</td>
                    <td>{v.kirExpiry ? <span className="badge badge-warning">{v.kirExpiry}</span> : "—"}</td>
                    <td style={{ color: "var(--text-muted)", maxWidth: 160 }}>{v.notes || "—"}</td>
                    <td>
                      <div style={{ display: "flex", gap: 2 }}>
                        <button className="btn btn-ghost btn-sm" onClick={() => openEdit(v)}>Edit</button>
                        <button className="btn btn-ghost btn-sm" style={{ color: "var(--danger)" }} onClick={() => remove(v.id)}>Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={show} title={edit ? "Edit Kendaraan" : "Tambah Kendaraan"} onClose={() => setShow(false)}>
        <div className="form-row">
          <div className="form-group"><label>Plat *</label><input value={form.plate} onChange={(e) => setForm({ ...form, plate: e.target.value })} placeholder="B 1234 ABC" /></div>
          <div className="form-group"><label>Merek</label><input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} placeholder="Hino" /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Model</label><input value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} placeholder="Dutro" /></div>
          <div className="form-group"><label>Tahun</label><input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Masa Berlaku STNK</label><input type="date" value={form.stnkExpiry} onChange={(e) => setForm({ ...form, stnkExpiry: e.target.value })} /></div>
          <div className="form-group"><label>Masa Berlaku KIR</label><input type="date" value={form.kirExpiry} onChange={(e) => setForm({ ...form, kirExpiry: e.target.value })} /></div>
        </div>
        <div className="form-group"><label>Catatan</label><textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={() => setShow(false)}>Batal</button>
          <button className="btn btn-primary" onClick={save}>{edit ? "Simpan" : "Tambah"}</button>
        </div>
      </Modal>
    </div>
  );
}
