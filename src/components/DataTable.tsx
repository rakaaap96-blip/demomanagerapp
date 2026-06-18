import { isValidElement, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Search,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  FileSpreadsheet,
  Loader2,
} from "lucide-react";

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => ReactNode;
  searchable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  pageSize?: number;
  searchPlaceholder?: string;
  exportFilename?: string;
  onExportPDF?: (data: T[]) => void;
  onRowClick?: (row: T) => void;
  containerClass?: string;
}

const PAGE_OPTIONS = [10, 20, 50, 100];

export default function DataTable<T extends object>({
  columns,
  data,
  loading,
  pageSize = 20,
  searchPlaceholder = "Cari data...",
  exportFilename = "data",
  onExportPDF,
  onRowClick,
  containerClass = "",
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [pageSizeActual, setPageSizeActual] = useState(pageSize);

  const searchableColumns = useMemo(() => columns.filter((c) => c.searchable !== false), [columns]);

  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter((row) =>
      searchableColumns.some((col) => {
        const val = row[col.key as keyof T];
        return val != null && String(val).toLowerCase().includes(q);
      }),
    );
  }, [data, search, searchableColumns]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey as keyof T];
      const bv = b[sortKey as keyof T];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      let cmp = 0;
      if (typeof av === "number" && typeof bv === "number") {
        cmp = av - bv;
      } else {
        cmp = String(av).localeCompare(String(bv));
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSizeActual));
  const safePage = Math.min(page, totalPages);
  const paged = sorted.slice((safePage - 1) * pageSizeActual, safePage * pageSizeActual);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const exportCsv = () => {
    const headers = columns.map((c) => c.label).join(",");
    const rows = sorted.map((row) =>
      columns
        .map((col) => {
          const raw = row[col.key as keyof T];
          if (col.render) {
            const rendered = col.render(row);
            return `"${extractTextFromReactNode(rendered)}"`;
          }
          return `"${raw == null ? "" : String(raw)}"`;
        })
        .join(","),
    );
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${exportFilename}.csv`;
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  function extractTextFromReactNode(node: ReactNode): string {
    if (!node) return "";
    if (typeof node === "string" || typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(extractTextFromReactNode).join(" ");
    if (isValidElement<{ children?: ReactNode }>(node)) {
      const children = node.props.children;
      if (children)
        return (Array.isArray(children) ? children : [children])
          .map(extractTextFromReactNode)
          .join(" ");
    }
    return "";
  }

  return (
    <div className="flex flex-direction-column gap-4">
      <div className="flex justify-between items-center mb-4">
        <div className="data-table-search">
          <Search size={18} className="text-muted" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder={searchPlaceholder}
          />
        </div>
        <div className="flex gap-2">
          {onExportPDF && (
            <button className="btn btn-outline" onClick={() => onExportPDF(sorted)}>
              <Download size={16} /> PDF
            </button>
          )}
          <button className="btn btn-outline" onClick={exportCsv}>
            <FileSpreadsheet size={16} /> CSV
          </button>
        </div>
      </div>

      <div className={`table-wrapper ${containerClass}`}>
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={col.sortable !== false ? "sortable" : ""}
                  onClick={() => {
                    if (col.sortable !== false) handleSort(col.key);
                  }}
                  style={{ cursor: col.sortable !== false ? "pointer" : "default" }}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {sortKey === col.key &&
                      (sortDir === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 && !loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-8">
                  <div className="text-muted">Tidak ada data ditemukan</div>
                </td>
              </tr>
            ) : loading && data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-8">
                  <Loader2 size={24} className="spin" style={{ margin: "0 auto" }} />
                </td>
              </tr>
            ) : (
              paged.map((row, i) => (
                <tr
                  key={getRowId(row) ?? `row-${i}`}
                  onClick={() => onRowClick?.(row)}
                  style={{ cursor: onRowClick ? "pointer" : undefined }}
                >
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(row) : String(row[col.key as keyof T] ?? "—")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="text-muted" style={{ fontSize: 13 }}>
              Menampilkan <strong>{paged.length}</strong> dari <strong>{sorted.length}</strong> data
            </div>
            <select
              className="input"
              style={{ width: "auto", padding: "2px 8px", fontSize: 12 }}
              value={pageSizeActual}
              onChange={(e) => {
                setPageSizeActual(Number(e.target.value));
                setPage(1);
              }}
            >
              {PAGE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button
              className="btn btn-outline"
              disabled={safePage <= 1}
              onClick={() => setPage(safePage - 1)}
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center px-4 font-medium" style={{ fontSize: 13 }}>
              Halaman {safePage} dari {totalPages}
            </div>
            <button
              className="btn btn-outline"
              disabled={safePage >= totalPages}
              onClick={() => setPage(safePage + 1)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function getRowId(row: object) {
  if ("id" in row) {
    const id = row.id;
    if (typeof id === "string" || typeof id === "number") return String(id);
  }
  return null;
}
