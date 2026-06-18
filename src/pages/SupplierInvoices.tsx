import { useState } from "react";
import { FileText, Plus, Upload } from "lucide-react";
import Modal from "../components/Modal";
import { useConfirm } from "../hooks/useConfirm";

interface SupplierInvoiceAttachment { id: number; invoiceNumber: string; supplierId: number; supplierName: string; invoiceDate: string | null; totalAmount: number; paidAmount: number; fileName: string | null; fileType: string | null; isActive: boolean; }

export default function SupplierInvoices() {
  const [data] = useState<SupplierInvoiceAttachment[]>([]);
  const [show, setShow] = useState(false);
  const confirm = useConfirm();

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>Invoice Supplier</h3>
          <button className="btn btn-primary" onClick={() => setShow(true)}><Plus size={16} />Tambah</button>
        </div>
        <div className="table-wrapper compact-table">
          <table>
            <thead>
              <tr><th>No Invoice</th><th>Supplier</th><th>Tgl</th><th>Total</th><th>Dibayar</th><th>File</th><th style={{ width: 100 }}>Aksi</th></tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr><td colSpan={7}><div className="empty-state"><FileText size={48} /><p>Belum ada invoice supplier</p></div></td></tr>
              ) : (
                data.map((d) => (
                  <tr key={d.id}>
                    <td><strong>{d.invoiceNumber}</strong></td>
                    <td>{d.supplierName}</td>
                    <td>{d.invoiceDate || "—"}</td>
                    <td>{d.totalAmount.toLocaleString("id-ID")}</td>
                    <td>{d.paidAmount.toLocaleString("id-ID")}</td>
                    <td>{d.fileName || "—"}</td>
                    <td><button className="btn btn-ghost btn-sm">Bayar</button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={show} title="Tambah Invoice Supplier" onClose={() => setShow(false)}>
        <p style={{ textAlign: "center", color: "var(--text-muted)", padding: 24 }}>Fitur demo</p>
      </Modal>
    </div>
  );
}
