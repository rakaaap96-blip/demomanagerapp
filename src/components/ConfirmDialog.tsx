import { AlertTriangle, Info, XCircle } from "lucide-react";
import Modal from "./Modal";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "info";
  onConfirm: () => void;
  onCancel: () => void;
}

const ICONS = {
  danger: { icon: XCircle, color: "var(--danger)" },
  warning: { icon: AlertTriangle, color: "var(--warning)" },
  info: { icon: Info, color: "var(--primary)" },
};

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Ya",
  cancelLabel = "Batal",
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const { icon: Icon, color } = ICONS[variant];

  return (
    <Modal open={open} title={title} onClose={onCancel} closable>
      <div style={{ textAlign: "center", padding: "16px 0" }}>
        <Icon size={48} color={color} style={{ marginBottom: 12 }} />
        <p style={{ margin: 0, fontSize: 14, color: "var(--text-muted)", whiteSpace: "pre-wrap" }}>
          {message}
        </p>
      </div>
      <div className="modal-actions" style={{ justifyContent: "center", gap: 12, marginTop: 8 }}>
        <button className="btn btn-ghost" onClick={onCancel}>
          {cancelLabel}
        </button>
        <button
          className="btn"
          style={{ backgroundColor: color, color: "#fff", border: "none" }}
          onClick={onConfirm}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
