import { type ReactNode, useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  closable?: boolean;
}

export default function Modal({ open, title, onClose, children, closable = true }: ModalProps) {
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";

    const handler = (e: KeyboardEvent) => {
      if (closable && e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "unset";
    };
  }, [open, closable]);

  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (closable && e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-container">
        <div className="modal-header">
          <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700 }}>{title}</h3>
          {closable && (
            <button className="btn-icon-sm" onClick={onClose}>
              <X size={20} />
            </button>
          )}
        </div>
        <div className="modal-body compact-scroll">{children}</div>
      </div>
    </div>
  );
}
