import { useState } from "react";
import { Users, Plus } from "lucide-react";
import Modal from "../components/Modal";
import { useConfirm } from "../hooks/useConfirm";

interface Client { id: number; name: string; contact: string | null; address: string | null; }

const emptyForm = { name: "", contact: "", address: "" };

export default function Clients() {
  const [clients] = useState<Client[]>([]);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState<Client | null>(null);
  const [form, setForm] = useState(emptyForm);
  const confirm = useConfirm();

  const openAdd = () => { setEdit(null); setForm(emptyForm); setShow(true); };
  const openEdit = (c: Client) => { setEdit(c); setForm({ name: c.name, contact: c.contact || "", address: c.address || "" }); setShow(true); };

  const save = async () => { alert("Fitur demo: menyimpan klien"); };
  const remove = async (id: number) => {
    if (!(await confirm({ message: "Hapus klien ini?" }))) return;
    alert("Fitur demo: menghapus klien");
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>Klien</h3>
          <button className="btn btn-primary" onClick={openAdd}><Plus size={16} />Tambah</button>
        </div>
        <div className="table-wrapper compact-table">
          <table>
            <thead>
              <tr><th>Nama</th><th>Kontak</th><th>Alamat</th><th style={{ width: 100 }}>Aksi</th></tr>
            </thead>
            <tbody>
              {clients.length === 0 ? (
                <tr><td colSpan={4}><div className="empty-state"><Users size={48} /><p>Belum ada data klien</p></div></td></tr>
              ) : (
                clients.map((c) => (
                  <tr key={c.id}>
                    <td><strong>{c.name}</strong></td>
                    <td>{c.contact || "—"}</td>
                    <td style={{ color: "var(--text-muted)" }}>{c.address || "—"}</td>
                    <td>
                      <div style={{ display: "flex", gap: 2 }}>
                        <button className="btn btn-ghost btn-sm" onClick={() => openEdit(c)}>Edit</button>
                        <button className="btn btn-ghost btn-sm" style={{ color: "var(--danger)" }} onClick={() => remove(c.id)}>Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={show} title={edit ? "Edit Klien" : "Tambah Klien"} onClose={() => setShow(false)}>
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
