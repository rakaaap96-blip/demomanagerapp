import { useMemo, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  LayoutDashboard,
  Package,
  Truck,
  Store,
  Users,
  FileText,
  ListTodo,
  FileBarChart,
  Settings,
  LogOut,
  Wrench,
  UserCircle,
  DollarSign,
  History,
  ShoppingCart,
  Bell,
  ChevronDown,
  Database,
  ArrowLeftRight,
  MoreHorizontal,
  CheckSquare,
  Menu,
  ChevronLeft,
} from "lucide-react";

interface NavChild {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface NavSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  children: NavChild[];
}

interface SidebarProps {
  active: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  collapsed: boolean;
  onToggle: () => void;
}

function isChildOf(sectionId: string, pageId: string, _role: string): boolean {
  if (sectionId === "owner_dashboard") return pageId === "owner_dashboard";
  if (sectionId === "approvals") return pageId === "approvals";
  if (sectionId === "data")
    return ["inventory", "vehicles", "suppliers", "clients", "employees", "drivers"].includes(
      pageId,
    );
  if (sectionId === "transactions")
    return [
      "repairs",
      "expense_requests",
      "purchase_orders",
      "invoices",
      "travel_permits",
      "travel_money",
      "proof_of_delivery",
    ].includes(pageId);
  if (sectionId === "employee_transactions")
    return ["salaries", "cash_advances", "kasbon_balances"].includes(pageId);
  if (sectionId === "reports") return ["reports", "audit_logs"].includes(pageId);
  if (sectionId === "others")
    return ["maintenance", "reminders", "todos", "admin"].includes(pageId);
  return false;
}

function buildSections(role: string): NavSection[] {
  const result: NavSection[] = [];
  if (role === "owner") {
    result.push({
      id: "owner_dashboard",
      label: "Dashboard Owner",
      icon: LayoutDashboard,
      children: [{ id: "owner_dashboard", label: "Dashboard Owner", icon: LayoutDashboard }],
    });
  }
  result.push(
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      children: [],
    },
    {
      id: "approvals",
      label: "Persetujuan",
      icon: CheckSquare,
      children: [{ id: "approvals", label: "Persetujuan", icon: CheckSquare }],
    },
    {
      id: "data",
      label: "Data Master",
      icon: Database,
      children: [
        { id: "inventory", label: "Inventaris", icon: Package },
        { id: "vehicles", label: "Kendaraan", icon: Truck },
        { id: "suppliers", label: "Supplier", icon: Store },
        { id: "clients", label: "Klien", icon: Users },
        { id: "employees", label: "Karyawan", icon: Wrench },
        { id: "drivers", label: "Driver", icon: UserCircle },
      ],
    },
    {
      id: "transactions",
      label: "Transaksi",
      icon: ArrowLeftRight,
      children: [
        { id: "repairs", label: "Perbaikan & Servis", icon: Wrench },
        { id: "expense_requests", label: "Pengajuan Biaya", icon: DollarSign },
        { id: "purchase_orders", label: "Purchase Order", icon: ShoppingCart },
        { id: "invoices", label: "Invoice", icon: FileText },
        { id: "travel_permits", label: "Surat Izin Jalan", icon: FileText },
        { id: "travel_money", label: "Uang Jalan", icon: DollarSign },
        { id: "proof_of_delivery", label: "Proof of Delivery", icon: FileText },
      ],
    },
    {
      id: "employee_transactions",
      label: "Transaksi Karyawan",
      icon: Users,
      children: [
        { id: "salaries", label: "Gaji Karyawan", icon: DollarSign },
        { id: "cash_advances", label: "Kasbon", icon: DollarSign },
        { id: "kasbon_balances", label: "Saldo Kasbon", icon: DollarSign },
      ],
    },
    {
      id: "reports",
      label: "Laporan",
      icon: FileBarChart,
      children: [
        { id: "reports", label: "Pusat Laporan", icon: FileBarChart },
        { id: "audit_logs", label: "Riwayat Aktivitas", icon: History },
      ],
    },
    {
      id: "others",
      label: "Lainnya",
      icon: MoreHorizontal,
      children: [
        { id: "maintenance", label: "Maintenance DB", icon: Database },
        { id: "reminders", label: "Pengingat", icon: Bell },
        { id: "todos", label: "To-Do List", icon: ListTodo },
        { id: "admin", label: "Pengaturan", icon: Settings },
      ],
    },
  );
  return result;
}

export default function Sidebar({
  active,
  onNavigate,
  onLogout,
  collapsed,
  onToggle,
}: SidebarProps) {
  const { admin } = useAuth();
  const role = admin?.role || "admin";

  const SECTIONS = useMemo(() => buildSections(role), [role]);

  const [openSections, setOpenSections] = useState<Set<string>>(() => {
    const s = new Set<string>();
    SECTIONS.forEach((sec) => {
      if (sec.id !== "dashboard" && isChildOf(sec.id, active, role)) s.add(sec.id);
    });
    return s;
  });

  const toggle = (id: string) => {
    if (collapsed) {
      onToggle();
      setOpenSections(new Set([id]));
      return;
    }
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div
      className={`sidebar ${collapsed ? "collapsed" : ""}`}
      style={{ width: collapsed ? "var(--sidebar-collapsed-width)" : "var(--sidebar-width)" }}
    >
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="sidebar-logo"></div>
          {!collapsed && (
            <div className="sidebar-brand-text">
              <h1>E-Manager</h1>
            </div>
          )}
        </div>
        {!collapsed && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={onToggle}
            style={{ marginLeft: "auto", color: "white" }}
          >
            <ChevronLeft size={20} />
          </button>
        )}
      </div>

      {collapsed && (
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0" }}>
          <button className="btn btn-ghost btn-sm" onClick={onToggle} style={{ color: "white" }}>
            <Menu size={20} />
          </button>
        </div>
      )}

      <nav className="sidebar-nav">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          if (section.id === "dashboard" || section.id === "owner_dashboard") {
            return (
              <div
                key={section.id}
                className={`nav-item ${active === section.id ? "active" : ""}`}
                onClick={() => onNavigate(section.id)}
                title={collapsed ? section.label : ""}
              >
                <span className="nav-icon">
                  <Icon size={20} />
                </span>
                {!collapsed && <span>{section.label}</span>}
              </div>
            );
          }
          if (section.id === "approvals") {
            return (
              <div
                key="approvals"
                className={`nav-item ${active === "approvals" ? "active" : ""}`}
                onClick={() => onNavigate("approvals")}
                title={collapsed ? "Persetujuan" : ""}
              >
                <span className="nav-icon">
                  <CheckSquare size={20} />
                </span>
                {!collapsed && <span>Persetujuan</span>}
              </div>
            );
          }
          const isOpen = openSections.has(section.id);
          const hasActive = isChildOf(section.id, active, role);
          return (
            <div key={section.id} className={`nav-section ${isOpen ? "open" : ""}`}>
              <div
                className={`nav-section-header ${hasActive ? "active-parent" : ""}`}
                onClick={() => toggle(section.id)}
                title={collapsed ? section.label : ""}
              >
                <span className="nav-icon">
                  <Icon size={20} />
                </span>
                {!collapsed && (
                  <>
                    <span className="nav-section-label-text">{section.label}</span>
                    <ChevronDown size={15} className={`nav-chevron ${isOpen ? "rotated" : ""}`} />
                  </>
                )}
              </div>
              {!collapsed && (
                <div className={`nav-section-items ${isOpen ? "open" : ""}`}>
                  {section.children.map((child) => {
                    const ChildIcon = child.icon;
                    return (
                      <div
                        key={child.id}
                        className={`nav-item nav-sub-item ${active === child.id ? "active" : ""}`}
                        onClick={() => onNavigate(child.id)}
                      >
                        <span className="nav-icon">
                          <ChildIcon size={18} />
                        </span>
                        <span>{child.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        {!collapsed && (
          <div className="sidebar-user">
            <span>Signed in as</span>
            <strong>{admin?.username}</strong>
            <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>
              {role}
            </span>
          </div>
        )}
        <div className="nav-item" onClick={onLogout} title={collapsed ? "Logout" : ""}>
          <span className="nav-icon">
            <LogOut size={20} />
          </span>
          {!collapsed && <span>Logout</span>}
        </div>
      </div>
    </div>
  );
}
