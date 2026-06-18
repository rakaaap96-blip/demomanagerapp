import { useState } from "react";
import { Package, Plus } from "lucide-react";
import Modal from "../components/Modal";
import { useConfirm } from "../hooks/useConfirm";

interface Part {
  id: number;
  name: string;
  sku: string | null;
  qty: number;
  minQty: number;
  unit: string;
}

const emptyForm = { name: "", sku: "", qty: 0, minQty: 0, unit: "pcs" };

export default function Inventory() {
  const [parts] = useState<Part[]>([]);
  const [showPart, setShowPart] = useState(false);
  const [showStock, setShowStock] = useState<{ part: Part; type: "masuk" | "keluar" } | null>(null);
  const [edit, setEdit] = useState<Part | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [stockForm, setStockForm] = useState({ qty: 1, reason: "" });
  const confirm = useConfirm();

  const openAdd = () => {
    setEdit(null);
    setForm(emptyForm);
    setShowPart(true);
  };
  const openEdit = (p: Part) => {
    setEdit(p);
    setForm({ name: p.name, sku: p.sku || "", qty: p.qty, minQty: p.minQty, unit: p.unit });
    setShowPart(true);
  };

  const savePart = async () => {
    alert("Fitur demo: menyimpan part");
  };

  const remove = async (id: number) => {
    if (!(await confirm({ message: "Hapus part ini?" }))) return;
    alert("Fitur demo: menghapus part");
  };

  const saveStock = async () => {
    alert("Fitur demo: menyimpan transaksi stok");
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>Inventaris Spare Part</h3>
          <button className="btn btn-primary" onClick={openAdd}>
            <Plus size={16} />
            Tambah
          </button>
        </div>
        <div className="table-wrapper compact-table">
          <table>
            <thead>
              <tr>
                <th>Nama</th>
                <th>SKU</th>
                <th>Stok</th>
                <th>Min</th>
                <th>Unit</th>
                <th style={{ width: 140 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {parts.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div className="empty-state">
                      <Package size={48} />
                      <p>Belum ada data part</p>
                    </div>
                  </td>
                </tr>
              ) : (
                parts.map((p) => (
                  <tr key={p.id}>
                    <td><strong>{p.name}</strong></td>
                    <td style={{ color: "var(--text-muted)" }}>{p.sku || "—"}</td>
                    <td><span className={`badge ${p.qty < p.minQty ? "badge-danger" : "badge-success"}`}>{p.qty}</span></td>
                    <td>{p.minQty}</td>
                    <td>{p.unit}</td>
                    <td>
                      <div style={{ display: "flex", gap: 2 }}>
                        <button className="btn btn-outline btn-sm" style={{ borderColor: "var(--success)", color: "var(--success)" }}
                          onClick={() => { setShowStock({ part: p, type: "masuk" }); setStockForm({ qty: 1, reason: "" }); }} title="Masuk">+</button>
                        <button className="btn btn-outline btn-sm" style={{ borderColor: "var(--warning)", color: "var(--warning)" }}
                          onClick={() => { setShowStock({ part: p, type: "keluar" }); setStockForm({ qty: 1, reason: "" }); }} title="Keluar">-</button>
                        <button className="btn btn-ghost btn-sm" onClick={() => openEdit(p)}>Edit</button>
                        <button className="btn btn-ghost btn-sm" style={{ color: "var(--danger)" }} onClick={() => remove(p.id)}>Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={showPart} title={edit ? "Edit Part" : "Tambah Part"} onClose={() => setShowPart(false)}>
        <div className="form-row">
          <div className="form-group">
            <label>Nama Part *</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Oli Mesin" />
          </div>
          <div className="form-group">
            <label>SKU</label>
            <input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} placeholder="OLI-001" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Stok Awal</label>
            <input type="number" min={0} value={form.qty} onChange={(e) => setForm({ ...form, qty: Math.max(0, +e.target.value) })} />
          </div>
          <div className="form-group">
            <label>Min Stok</label>
            <input type="number" min={0} value={form.minQty} onChange={(e) => setForm({ ...form, minQty: Math.max(0, +e.target.value) })} />
          </div>
          <div className="form-group">
            <label>Satuan</label>
            <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}>
              <option>pcs</option>
              <option>liter</option>
              <option>kg</option>
              <option>meter</option>
              <option>box</option>
            </select>
          </div>
        </div>
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={() => setShowPart(false)}>Batal</button>
          <button className="btn btn-primary" onClick={savePart}>{edit ? "Simpan" : "Tambah"}</button>
        </div>
      </Modal>

      <Modal open={showStock !== null} title={`Stock ${showStock?.type === "masuk" ? "Masuk" : "Keluar"} — ${showStock?.part.name ?? ""}`} onClose={() => setShowStock(null)}>
        <div className="form-group">
          <label>Jumlah</label>
          <input type="number" min={1} value={stockForm.qty} onChange={(e) => setStockForm({ ...stockForm, qty: +e.target.value })} />
        </div>
        <div className="form-group">
          <label>Alasan</label>
          <input value={stockForm.reason} onChange={(e) => setStockForm({ ...stockForm, reason: e.target.value })} placeholder={showStock?.type === "masuk" ? "Pembelian dari supplier" : "Pemakaian kendaraan"} />
        </div>
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={() => setShowStock(null)}>Batal</button>
          <button className={`btn ${showStock?.type === "masuk" ? "btn-success" : "btn-warning"}`} onClick={saveStock}>
            {showStock?.type === "masuk" ? "Masuk" : "Keluar"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
