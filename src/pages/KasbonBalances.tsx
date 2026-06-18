import { useState } from "react";
import { DollarSign } from "lucide-react";

interface MechanicKasbonBalance { employeeId: number; employeeName: string; phone: string | null; totalKasbon: number; totalRepaid: number; outstandingBalance: number; }

export default function KasbonBalances() {
  const [data] = useState<MechanicKasbonBalance[]>([]);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3>Detail Kasbon</h3>
        </div>
        <div className="table-wrapper compact-table">
          <table>
            <thead>
              <tr><th>Karyawan</th><th>Telp</th><th>Total Kasbon</th><th>Terbayar</th><th>Sisa</th></tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr><td colSpan={5}><div className="empty-state"><DollarSign size={48} /><p>Belum ada data kasbon</p></div></td></tr>
              ) : (
                data.map((d) => (
                  <tr key={d.employeeId}>
                    <td><strong>{d.employeeName}</strong></td>
                    <td>{d.phone || "—"}</td>
                    <td>{d.totalKasbon.toLocaleString("id-ID")}</td>
                    <td>{d.totalRepaid.toLocaleString("id-ID")}</td>
                    <td style={{ fontWeight: 600, color: d.outstandingBalance > 0 ? "var(--danger)" : "var(--success)" }}>{d.outstandingBalance.toLocaleString("id-ID")}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
