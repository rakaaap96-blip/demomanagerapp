import { Archive, RotateCcw } from "lucide-react";
import type { ReactNode } from "react";
import Modal from "./Modal";

interface ArchivedItem {
  id?: string | number;
  archivedAt?: string | null;
  archived_at?: string | null;
}

interface ArchiveCol<T> {
  key: string;
  label: string;
  render: (item: T) => ReactNode;
}

interface ArchiveModalProps<T extends ArchivedItem> {
  open: boolean;
  title: string;
  onClose: () => void;
  archived: T[];
  columns: ArchiveCol<T>[];
  onRestore: (item: T) => Promise<void>;
}

export default function ArchiveModal<T extends ArchivedItem>({
  open,
  title,
  onClose,
  archived,
  columns,
  onRestore,
}: ArchiveModalProps<T>) {
  const grouped = archived.reduce<Record<string, T[]>>((acc, item) => {
    const archivedDate = item.archivedAt || item.archived_at || "";
    const m = archivedDate.slice(0, 7) || "-";
    if (!acc[m]) acc[m] = [];
    acc[m].push(item);
    return acc;
  }, {});
  const monthKeys = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <Modal open={open} title={title} onClose={onClose}>
      {archived.length === 0 ? (
        <div className="empty-state">
          <Archive size={48} />
          <p>Belum ada data arsip</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {monthKeys.flatMap((month) => [
                <tr key={month} style={{ background: "var(--bg-muted)" }}>
                  <td
                    colSpan={columns.length + 1}
                    style={{ padding: "8px 12px", fontWeight: 600, color: "var(--text-muted)" }}
                  >
                    {month === "-"
                      ? "Tidak diketahui"
                      : new Date(month + "-01").toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                        })}
                  </td>
                </tr>,
                ...grouped[month].map((item) => (
                  <tr key={item.id ?? `${month}-${grouped[month].indexOf(item)}`}>
                    {columns.map((col) => (
                      <td key={col.key}>{col.render(item)}</td>
                    ))}
                    <td>
                      <button
                        className="btn btn-ghost btn-sm"
                        style={{ color: "var(--primary)" }}
                        onClick={() => onRestore(item)}
                        title="Kembalikan"
                      >
                        <RotateCcw size={14} />
                      </button>
                    </td>
                  </tr>
                )),
              ])}
            </tbody>
          </table>
        </div>
      )}
    </Modal>
  );
}
