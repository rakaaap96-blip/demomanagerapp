import { useState } from "react";
import { Toaster } from "sonner";
import "./styles/theme.css";
import Sidebar from "./components/Sidebar";
import LoginModal from "./components/LoginModal";
import { ConfirmProvider } from "./components/ConfirmProvider";
import { AuthContext } from "./hooks/useAuth";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Vehicles from "./pages/Vehicles";
import Employees from "./pages/Employees";
import Drivers from "./pages/Drivers";
import Suppliers from "./pages/Suppliers";
import Clients from "./pages/Clients";
import Repairs from "./pages/Repairs";
import CashAdvances from "./pages/CashAdvances";
import Invoices from "./pages/Invoices";
import Reports from "./pages/Reports";
import AuditLogs from "./pages/AuditLogs";
import Maintenance from "./pages/Maintenance";
import Todos from "./pages/Todos";
import Admin from "./pages/Admin";
import PurchaseOrders from "./pages/PurchaseOrders";
import SupplierInvoices from "./pages/SupplierInvoices";
import ExpenseRequests from "./pages/ExpenseRequests";
import Reminders from "./pages/Reminders";
import Approvals from "./pages/Approvals";
import OwnerDashboard from "./pages/OwnerDashboard";
import TravelPermits from "./pages/TravelPermits";
import TravelMoney from "./pages/TravelMoney";
import ProofOfDelivery from "./pages/ProofOfDelivery";
import Salaries from "./pages/Salaries";
import KasbonBalances from "./pages/KasbonBalances";
import type { AdminInfo } from "./types";

const PAGE_TITLES: Record<string, string> = {
  dashboard: "Dashboard",
  owner_dashboard: "Dashboard Owner",
  supplier_invoices: "Invoice Supplier",
  inventory: "Inventaris",
  vehicles: "Kendaraan",
  employees: "Karyawan",
  drivers: "Driver",
  suppliers: "Supplier",
  clients: "Klien",
  repairs: "Perbaikan & Servis",
  cash_advances: "Kasbon Karyawan",
  salaries: "Penggajian",
  kasbon_balances: "Detail Kasbon",
  travel_permits: "Surat Izin Jalan",
  travel_money: "Uang Jalan",
  proof_of_delivery: "Proof of Delivery",
  expense_requests: "Pengajuan Biaya",
  purchase_orders: "Purchase Order",
  invoices: "Invoice & Pembayaran",
  approvals: "Persetujuan",
  reports: "Laporan & Cetak",
  audit_logs: "Riwayat Aktivitas",
  maintenance: "Maintenance Database",
  reminders: "Pengingat & Masa Berlaku",
  todos: "To-Do List",
  admin: "Pengaturan Admin",
};

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [admin, setAdmin] = useState<AdminInfo | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogin = (info: AdminInfo) => {
    setAdmin(info);
    setIsAuthenticated(true);
    setShowLogin(false);
    if (info.role === "owner") setPage("owner_dashboard");
  };

  const handleLogout = () => {
    setAdmin(null);
    setIsAuthenticated(false);
    setShowLogin(true);
  };

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard />;
      case "owner_dashboard":
        return <OwnerDashboard />;
      case "supplier_invoices":
        return <SupplierInvoices />;
      case "inventory":
        return <Inventory />;
      case "vehicles":
        return <Vehicles />;
      case "employees":
        return <Employees />;
      case "drivers":
        return <Drivers />;
      case "suppliers":
        return <Suppliers />;
      case "clients":
        return <Clients />;
      case "repairs":
        return <Repairs />;
      case "cash_advances":
        return <CashAdvances />;
      case "salaries":
        return <Salaries />;
      case "kasbon_balances":
        return <KasbonBalances />;
      case "invoices":
        return <Invoices />;
      case "reports":
        return <Reports />;
      case "audit_logs":
        return <AuditLogs />;
      case "maintenance":
        return <Maintenance />;
      case "travel_permits":
        return <TravelPermits />;
      case "travel_money":
        return <TravelMoney />;
      case "proof_of_delivery":
        return <ProofOfDelivery />;
      case "expense_requests":
        return <ExpenseRequests />;
      case "purchase_orders":
        return <PurchaseOrders />;
      case "reminders":
        return <Reminders />;
      case "todos":
        return <Todos />;
      case "admin":
        return <Admin />;
      case "approvals":
        return <Approvals />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AuthContext.Provider value={{ admin, setAdmin }}>
      <ConfirmProvider>
        <LoginModal open={showLogin} onLogin={handleLogin} />
        {isAuthenticated && (
          <div className={`app-layout ${sidebarCollapsed ? "collapsed" : ""}`}>
            <Sidebar
              active={page}
              onNavigate={setPage}
              onLogout={handleLogout}
              collapsed={sidebarCollapsed}
              onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
            <div className="main-content">
              <div className="topbar">
                <div className="flex items-center gap-4">
                  <h2>{PAGE_TITLES[page] || page}</h2>
                </div>
                <div className="flex items-center gap-4">
                  <span className="badge badge-info">E-Manager Demo</span>
                </div>
              </div>
              <div className="page-content">{renderPage()}</div>
            </div>
          </div>
        )}
        <Toaster position="top-right" richColors closeButton />
      </ConfirmProvider>
    </AuthContext.Provider>
  );
}
