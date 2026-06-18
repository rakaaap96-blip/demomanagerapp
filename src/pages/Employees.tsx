import { useState } from "react";
import { Wrench, Plus } from "lucide-react";
import Modal from "../components/Modal";
import { useConfirm } from "../hooks/useConfirm";

interface Employee {
  id: number; name: string; phone: string | null; employeeType: string;
  specialization: string | null; hireDate: string | null; salary: number;
  username: string | null; licenseNumber: string | null; vehicleId: number | null;
}

const emptyForm = { name: "", phone: "", employeeType: "Mekanik", specialization: "", hireDate: "", salary: "0", username: "", licenseNumber: "", vehicleId: "" };

export default function Employees() {
  const [employees] = useState<Employee[]>([]);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState<Employee | null>(null);
  const [form, setForm] = useState(emptyForm);
  const confirm = useConfirm();

  const openAdd = () => { setEdit(null); setForm(emptyForm); setShow(true); };
  const openEdit = (e: Employee) => {
    setEdit(e);
    setForm({ name: e.name, phone: e.phone || "", employeeType: e.employeeType, specialization: e.specialization || "", hireDate: e.hireDate || "", salary: String(e.salary), username: e.username || "", licenseNumber: e.licenseNumber || "", vehicleId: e.vehicleId ? String(e.vehicleId) : "" });
    setShow(true);
  };

  const save = async () => { alert("Fitur demo: menyimpan karyawan"); };
  const remove = async (_id: number) => {
    if (!(await confirm({ message: "Hapus karyawan ini?" }))) return;
    alert("Fitur demo: menghapus karyawan");
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>Karyawan</h3>
          <button className="btn btn-primary" onClick={openAdd}><Plus size={16} />Tambah</button>
        </div>
        <div className="table-wrapper compact-table">
          <table>
            <thead>
              <tr>
                <th>Nama</th><th>Jenis</th><th>Spesialisasi</th><th>Telp</th><th>Gaji</th><th>Bergabung</th><th style={{ width: 100 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr><td colSpan={7}><div className="empty-state"><Wrench size={48} /><p>Belum ada data karyawan</p></div></td></tr>
              ) : (
                employees.map((e) => (
                  <tr key={e.id}>
                    <td><strong>{e.name}</strong></td>
                    <td><span className="badge badge-info">{e.employeeType}</span></td>
                    <td>{e.specialization || "—"}</td>
                    <td>{e.phone || "—"}</td>
                    <td>{e.salary.toLocaleString("id-ID")}</td>
                    <td>{e.hireDate || "—"}</td>
                    <td>
                      <div style={{ display: "flex", gap: 2 }}>
                        <button className="btn btn-ghost btn-sm" onClick={() => openEdit(e)}>Edit</button>
                        <button className="btn btn-ghost btn-sm" style={{ color: "var(--danger)" }} onClick={() => remove(e.id)}>Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={show} title={edit ? "Edit Karyawan" : "Tambah Karyawan"} onClose={() => setShow(false)}>
        <div className="form-row">
          <div className="form-group"><label>Nama *</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div className="form-group"><label>Jenis</label><select value={form.employeeType} onChange={(e) => setForm({ ...form, employeeType: e.target.value })}>
            <option>Mekanik</option><option>Driver</option><option>Staff</option>
          </select></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Spesialisasi</label><input value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} /></div>
          <div className="form-group"><label>No Telp</label><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Gaji Pokok</label><input type="number" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} /></div>
          <div className="form-group"><label>Tgl Bergabung</label><input type="date" value={form.hireDate} onChange={(e) => setForm({ ...form, hireDate: e.target.value })} /></div>
        </div>
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={() => setShow(false)}>Batal</button>
          <button className="btn btn-primary" onClick={save}>{edit ? "Simpan" : "Tambah"}</button>
        </div>
      </Modal>
    </div>
  );
}
