import { useState } from "react";
import { Settings, Plus, Shield, User } from "lucide-react";
import Modal from "../components/Modal";
import { useConfirm } from "../hooks/useConfirm";

interface Admin { id: number; username: string; role: string; }

export default function AdminPage() {
  const [admins] = useState<Admin[]>([{ id: 1, username: "owner", role: "owner" }]);
  const [show, setShow] = useState(false);
  const confirm = useConfirm();

  const remove = async (_id: number) => {
    if (!(await confirm({ message: "Hapus admin ini?" }))) return;
    alert("Fitur demo: menghapus admin");
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>Pengaturan Admin</h3>
          <button className="btn btn-primary" onClick={() => setShow(true)}><Plus size={16} />Tambah</button>
        </div>
        <div className="table-wrapper compact-table">
          <table>
            <thead>
              <tr><th>Username</th><th>Role</th><th style={{ width: 100 }}>Aksi</th></tr>
            </thead>
            <tbody>
              {admins.length === 0 ? (
                <tr><td colSpan={3}><div className="empty-state"><Settings size={48} /><p>Belum ada admin</p></div></td></tr>
              ) : (
                admins.map((a) => (
                  <tr key={a.id}>
                    <td><strong><User size={14} style={{ marginRight: 6 }} />{a.username}</strong></td>
                    <td><span className="badge badge-info"><Shield size={12} style={{ marginRight: 4 }} />{a.role}</span></td>
                    <td>
                      <button className="btn btn-ghost btn-sm" style={{ color: "var(--danger)" }} onClick={() => remove(a.id)}>Hapus</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={show} title="Tambah Admin" onClose={() => setShow(false)}>
        <p style={{ textAlign: "center", color: "var(--text-muted)", padding: 24 }}>Fitur demo</p>
      </Modal>
    </div>
  );
}
