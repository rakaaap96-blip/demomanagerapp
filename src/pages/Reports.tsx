import { useState } from "react";
import { FileBarChart, FileText, DollarSign, ClipboardList } from "lucide-react";

const TABS = [
  { id: "inventory", label: "Inventaris", icon: FileBarChart, group: "Laporan" },
  { id: "repair", label: "Perbaikan", icon: FileBarChart, group: "Laporan" },
  { id: "finance", label: "Keuangan", icon: DollarSign, group: "Laporan" },
  { id: "supplier", label: "Supplier", icon: FileText, group: "Laporan" },
  { id: "invoice", label: "Invoice", icon: FileText, group: "Laporan" },
  { id: "kasbon", label: "Kasbon", icon: DollarSign, group: "Laporan" },
];

export default function Reports() {
  const [tab, setTab] = useState("inventory");

  const renderReport = () => {
    return (
      <div className="empty-state">
        <ClipboardList size={48} />
        <p>Pilih laporan di samping untuk melihat data. (Demo: tidak ada data)</p>
      </div>
    );
  };

  return (
    <div className="report-container">
      <div className="report-sidebar">
        {["Laporan"].map((group) => (
          <div key={group} className="report-tab-group">
            <h4>{group}</h4>
            {TABS.filter((t) => t.group === group).map((t) => (
              <button
                key={t.id}
                className={`report-tab-btn ${tab === t.id ? "active" : ""}`}
                onClick={() => setTab(t.id)}
              >
                <t.icon size={18} />
                {t.label}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="report-content card">
        <div className="card-header">
          <h3>
            {TABS.find((t) => t.id === tab)?.label || "Laporan"} — Demo
          </h3>
        </div>
        {renderReport()}
      </div>
    </div>
  );
}
