import { useState } from "react";
import { UserCircle, Plus } from "lucide-react";
import Modal from "../components/Modal";
import { useConfirm } from "../hooks/useConfirm";

interface Driver {
  id: number; name: string; phone: string | null; licenseNumber: string | null;
  vehicleId: number | null; hireDate: string | null; salary: number;
}

const emptyForm = { name: "", phone: "", licenseNumber: "", vehicleId: "", hireDate: "", salary: "0" };

export default function Drivers() {
  const [drivers] = useState<Driver[]>([]);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState<Driver | null>(null);
  const [form, setForm] = useState(emptyForm);
  const confirm = useConfirm();

  const openAdd = () => { setEdit(null); setForm(emptyForm); setShow(true); };
  const openEdit = (d: Driver) => {
    setEdit(d);
    setForm({ name: d.name, phone: d.phone || "", licenseNumber: d.licenseNumber || "", vehicleId: d.vehicleId ? String(d.vehicleId) : "", hireDate: d.hireDate || "", salary: String(d.salary) });
    setShow(true);
  };

  const save = async () => { alert("Fitur demo: menyimpan driver"); };
  const remove = async (id: number) => {
    if (!(await confirm({ message: "Hapus driver ini?" }))) return;
    alert("Fitur demo: menghapus driver");
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>Driver</h3>
          <button className="btn btn-primary" onClick={openAdd}><Plus size={16} />Tambah</button>
        </div>
        <div className="table-wrapper compact-table">
          <table>
            <thead>
              <tr>
                <th>Nama</th><th>Telp</th><th>SIM</th><th>Kendaraan</th><th>Gaji</th><th style={{ width: 100 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {drivers.length === 0 ? (
                <tr><td colSpan={6}><div className="empty-state"><UserCircle size={48} /><p>Belum ada data driver</p></div></td></tr>
              ) : (
                drivers.map((d) => (
                  <tr key={d.id}>
                    <td><strong>{d.name}</strong></td>
                    <td>{d.phone || "—"}</td>
                    <td>{d.licenseNumber || "—"}</td>
                    <td>{d.vehicleId ? `#${d.vehicleId}` : "—"}</td>
                    <td>{d.salary.toLocaleString("id-ID")}</td>
                    <td>
                      <div style={{ display: "flex", gap: 2 }}>
                        <button className="btn btn-ghost btn-sm" onClick={() => openEdit(d)}>Edit</button>
                        <button className="btn btn-ghost btn-sm" style={{ color: "var(--danger)" }} onClick={() => remove(d.id)}>Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={show} title={edit ? "Edit Driver" : "Tambah Driver"} onClose={() => setShow(false)}>
        <div className="form-row">
          <div className="form-group"><label>Nama *</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div className="form-group"><label>Telp</label><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>No SIM</label><input value={form.licenseNumber} onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })} /></div>
          <div className="form-group"><label>Gaji</label><input type="number" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} /></div>
        </div>
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={() => setShow(false)}>Batal</button>
          <button className="btn btn-primary" onClick={save}>{edit ? "Simpan" : "Tambah"}</button>
        </div>
      </Modal>
    </div>
  );
}
