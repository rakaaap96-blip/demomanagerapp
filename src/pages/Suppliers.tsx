import { useState } from "react";
import { Store, Plus } from "lucide-react";
import Modal from "../components/Modal";
import { useConfirm } from "../hooks/useConfirm";

interface Supplier { id: number; name: string; contact: string | null; address: string | null; }

const emptyForm = { name: "", contact: "", address: "" };

export default function Suppliers() {
  const [suppliers] = useState<Supplier[]>([]);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState<Supplier | null>(null);
  const [form, setForm] = useState(emptyForm);
  const confirm = useConfirm();

  const openAdd = () => { setEdit(null); setForm(emptyForm); setShow(true); };
  const openEdit = (s: Supplier) => { setEdit(s); setForm({ name: s.name, contact: s.contact || "", address: s.address || "" }); setShow(true); };

  const save = async () => { alert("Fitur demo: menyimpan supplier"); };
  const remove = async (id: number) => {
    if (!(await confirm({ message: "Hapus supplier ini?" }))) return;
    alert("Fitur demo: menghapus supplier");
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>Supplier</h3>
          <button className="btn btn-primary" onClick={openAdd}><Plus size={16} />Tambah</button>
        </div>
        <div className="table-wrapper compact-table">
          <table>
            <thead>
              <tr><th>Nama</th><th>Kontak</th><th>Alamat</th><th style={{ width: 100 }}>Aksi</th></tr>
            </thead>
            <tbody>
              {suppliers.length === 0 ? (
                <tr><td colSpan={4}><div className="empty-state"><Store size={48} /><p>Belum ada data supplier</p></div></td></tr>
              ) : (
                suppliers.map((s) => (
                  <tr key={s.id}>
                    <td><strong>{s.name}</strong></td>
                    <td>{s.contact || "—"}</td>
                    <td style={{ color: "var(--text-muted)" }}>{s.address || "—"}</td>
                    <td>
                      <div style={{ display: "flex", gap: 2 }}>
                        <button className="btn btn-ghost btn-sm" onClick={() => openEdit(s)}>Edit</button>
                        <button className="btn btn-ghost btn-sm" style={{ color: "var(--danger)" }} onClick={() => remove(s.id)}>Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={show} title={edit ? "Edit Supplier" : "Tambah Supplier"} onClose={() => setShow(false)}>
        <div className="form-group"><label>Nama *</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div className="form-group"><label>Kontak</label><input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} /></div>
        <div className="form-group"><label>Alamat</label><textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={() => setShow(false)}>Batal</button>
          <button className="btn btn-primary" onClick={save}>{edit ? "Simpan" : "Tambah"}</button>
        </div>
      </Modal>
    </div>
  );
}
