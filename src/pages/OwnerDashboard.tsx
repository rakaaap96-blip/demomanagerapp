import { useState } from "react";
import { LayoutDashboard, TrendingUp, Truck, ClipboardList, AlertTriangle, Bell, DollarSign, Package } from "lucide-react";
import { StatCard } from "../components/Charts";
import { useAuth } from "../hooks/useAuth";

export default function OwnerDashboard() {
  const { admin } = useAuth();

  return (
    <div>
      <div className="stats-grid">
        <StatCard label="Biaya Bulan Ini" value="—" icon={<DollarSign size={24} />} color="red" suffix="total pengeluaran" />
        <StatCard label="Biaya Tahun Ini" value="—" icon={<TrendingUp size={24} />} color="blue" suffix="akumulasi" />
        <StatCard label="Kasbon Aktif" value="—" icon={<DollarSign size={24} />} color="yellow" suffix="masih berjalan" />
        <StatCard label="Outstanding Kasbon" value="—" icon={<DollarSign size={24} />} color="orange" suffix="belum lunas" />
        <StatCard label="Stok Kritis" value="—" icon={<AlertTriangle size={24} />} color="red" suffix="perlu reorder" />
        <StatCard label="STNK Akan Habis" value="—" icon={<Truck size={24} />} color="purple" suffix="perpanjangan" />
        <StatCard label="KIR Akan Habis" value="—" icon={<Truck size={24} />} color="cyan" suffix="perpanjangan" />
        <StatCard label="Pembayaran Masuk" value="—" icon={<DollarSign size={24} />} color="green" suffix="bulan ini" />
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3>Biaya Kendaraan Tertinggi</h3>
            <TrendingUp size={18} />
          </div>
          <div className="empty-state">
            <ClipboardList size={48} />
            <p>Belum ada data biaya kendaraan</p>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3>Spare Part Terpakai</h3>
            <Package size={18} />
          </div>
          <div className="empty-state">
            <ClipboardList size={48} />
            <p>Belum ada data spare part</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3>Perbaikan Terbaru</h3>
          </div>
          <div className="empty-state">
            <ClipboardList size={48} />
            <p>Belum ada perbaikan tercatat</p>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3>Pengingat Masa Berlaku</h3>
            <Bell size={18} />
          </div>
          <div className="empty-state">
            <Bell size={48} />
            <p>Semua dokumen masih berlaku</p>
          </div>
        </div>
      </div>
    </div>
  );
}
