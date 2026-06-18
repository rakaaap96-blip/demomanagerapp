import { useState } from "react";
import { Database, AlertTriangle } from "lucide-react";
import { useConfirm } from "../hooks/useConfirm";

export default function Maintenance() {
  const confirm = useConfirm();

  const handleVacuum = async () => {
    if (!(await confirm({ message: "Jalankan VACUUM? Ini hanya simulasi demo.", variant: "warning", confirmLabel: "Jalankan" }))) return;
    alert("Fitur demo: VACUUM dijalankan");
  };

  const handleReindex = async () => {
    if (!(await confirm({ message: "Jalankan REINDEX? Ini hanya simulasi demo.", variant: "warning", confirmLabel: "Jalankan" }))) return;
    alert("Fitur demo: REINDEX dijalankan");
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>Maintenance Database</h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, background: "var(--bg)", borderRadius: "var(--radius-md)" }}>
            <div>
              <strong>VACUUM</strong>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>Bersihkan data sampah dan optimalkan ukuran database</p>
            </div>
            <button className="btn btn-outline" onClick={handleVacuum}>Jalankan</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 16, background: "var(--bg)", borderRadius: "var(--radius-md)" }}>
            <div>
              <strong>REINDEX</strong>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>Bangun ulang index untuk performa query lebih cepat</p>
            </div>
            <button className="btn btn-outline" onClick={handleReindex}>Jalankan</button>
          </div>
        </div>
        <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8, padding: 12, background: "var(--warning-bg)", borderRadius: "var(--radius-sm)" }}>
          <AlertTriangle size={16} style={{ color: "var(--warning)" }} />
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Demo: tombol maintenance hanya simulasi, tidak ada perubahan pada database</span>
        </div>
      </div>
    </div>
  );
}
