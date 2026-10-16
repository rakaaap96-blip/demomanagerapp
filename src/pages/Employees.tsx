import { useState } from "react";
import { Wrench, Plus } from "lucide-react";
import { toast } from "sonner";
import Modal from "../components/Modal";
import { useConfirm } from "../hooks/useConfirm";
import type { Employee } from "../types";

const STORAGE_KEY = "demo.employees";

const loadEmployees = (): Employee[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Employee[]) : [];
  } catch {
    return [];
  }
};

const persistEmployees = (list: Employee[]): Employee[] => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    toast.error("Gagal menyimpan data ke penyimpanan browser");
  }
  return list;
};

const emptyForm = { name: "", phone: "", employeeType: "Mekanik", specialization: "", hireDate: "", salary: "0", username: "", licenseNumber: "", vehicleId: "" };

const trimOrNull = (v: string) => (v.trim() ? v.trim() : null);

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>(loadEmployees);
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

  const save = () => {
    const name = form.name.trim();
    if (!name) {
      toast.error("Nama karyawan wajib diisi");
      return;
    }
    const salary = Math.max(0, Number(form.salary) || 0);

    if (edit) {
      const next = employees.map((e) => (e.id === edit.id
        ? { ...e, name, phone: trimOrNull(form.phone), employeeType: form.employeeType, specialization: trimOrNull(form.specialization), hireDate: trimOrNull(form.hireDate), salary }
        : e));
      setEmployees(persistEmployees(next));
      toast.success(`Karyawan "${name}" diperbarui`);
    } else {
      const id = employees.reduce((max, e) => Math.max(max, e.id), 0) + 1;
      const created: Employee = {
        id, name, phone: trimOrNull(form.phone), employeeType: form.employeeType,
        specialization: trimOrNull(form.specialization), hireDate: trimOrNull(form.hireDate),
        salary, username: trimOrNull(form.username), licenseNumber: trimOrNull(form.licenseNumber),
        vehicleId: form.vehicleId ? Number(form.vehicleId) : null,
        ktpPath: null, simPath: null, createdAt: new Date().toISOString(),
      };
      setEmployees(persistEmployees([...employees, created]));
      toast.success(`Karyawan "${name}" ditambahkan`);
    }
    setShow(false);
  };

  const remove = async (id: number) => {
    const target = employees.find((e) => e.id === id);
    if (!target) return;
    if (!(await confirm({ message: `Hapus karyawan "${target.name}"?`, variant: "danger", confirmLabel: "Hapus" }))) return;
    setEmployees(persistEmployees(employees.filter((e) => e.id !== id)));
    toast.success(`Karyawan "${target.name}" dihapus`);
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
