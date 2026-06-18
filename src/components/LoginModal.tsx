import { LogIn } from "lucide-react";
import type { AdminInfo } from "../types";

interface LoginModalProps {
  open: boolean;
  onLogin: (info: AdminInfo) => void;
}

export default function LoginModal({ open, onLogin }: LoginModalProps) {
  if (!open) return null;

  const handleLogin = () => {
    onLogin({ id: 1, username: "owner", role: "owner" });
  };

  return (
    <div className="login-overlay">
      <div className="login-card">
        <div className="login-logo" style={{ objectFit: "contain", padding: 8 }}>
          JPP
        </div>
        <h2>E-Manager</h2>
        <p className="login-subtitle">Masuk untuk melanjutkan</p>
        <div className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input value="owner" disabled />
          </div>
          <div className="form-group">
            <label>PIN</label>
            <input type="password" value="******" disabled placeholder="******" />
          </div>
          <button className="btn btn-primary login-btn" onClick={handleLogin}>
            <LogIn size={16} />
            Masuk Demo
          </button>
        </div>
      </div>
    </div>
  );
}
