import { Package, Truck, FileText, AlertTriangle, Wrench, UserCircle, Activity, DollarSign, TrendingUp, ClipboardList, Bell } from "lucide-react";
import { StatCard } from "../components/Charts";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  useAuth();

  return (
    <div>
      <div className="stats-grid">
        <StatCard label="Total Part" value="—" icon={<Package size={24} />} color="blue" suffix="part tercatat" />
        <StatCard label="Kendaraan" value="—" icon={<Truck size={24} />} color="green" suffix="dump truck" />
        <StatCard label="Invoice Belum Lunas" value="—" icon={<FileText size={24} />} color="yellow" suffix="perlu ditagih" />
        <StatCard label="Stok Menipis" value="—" icon={<AlertTriangle size={24} />} color="red" suffix="perlu order" />
        <StatCard label="Mekanik" value="—" icon={<Wrench size={24} />} color="purple" suffix="tenaga ahli" />
        <StatCard label="Driver" value="—" icon={<UserCircle size={24} />} color="cyan" suffix="terdaftar" />
        <StatCard label="Perbaikan Aktif" value="—" icon={<Activity size={24} />} color="orange" suffix="dalam proses" />
        <StatCard label="Kasbon Pending" value="—" icon={<DollarSign size={24} />} color="pink" suffix="menunggu approve" />
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3>Trend Stok Masuk</h3>
            <TrendingUp size={18} />
          </div>
          <div className="empty-state">
            <ClipboardList size={48} />
            <p>Belum ada data transaksi stok</p>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3>Trend Stok Keluar</h3>
            <TrendingUp size={18} />
          </div>
          <div className="empty-state">
            <ClipboardList size={48} />
            <p>Belum ada data transaksi stok</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3>Aktivitas Terbaru</h3>
          </div>
          <div className="empty-state">
            <ClipboardList size={48} />
            <p>Belum ada aktivitas. Mulai dengan menambah inventaris atau kendaraan.</p>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3>Pengingat Aktif</h3>
            <Bell size={18} />
          </div>
          <div className="empty-state">
            <Bell size={48} />
            <p>Tidak ada pengingat aktif</p>
          </div>
        </div>
      </div>
    </div>
  );
}
