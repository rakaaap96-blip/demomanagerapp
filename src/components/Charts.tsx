interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  height?: number;
  title?: string;
}

export function BarChart({ data, height = 200, title }: BarChartProps) {
  if (data.length === 0) return null;
  const max = Math.max(...data.map((d) => d.value), 1);
  const pad = 30;
  const chartW = 1000;
  const barW = Math.max(10, Math.min(50, (chartW - pad * 2) / data.length - 8));
  const cols = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
  ];

  return (
    <div className="chart-container">
      {title && <h4 className="chart-title">{title}</h4>}
      <svg viewBox={`0 0 ${chartW} ${height + 40}`} style={{ width: "100%", height: "auto" }}>
        {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
          <g key={pct}>
            <line
              x1={pad}
              y1={height - height * pct + 20}
              x2={pad + data.length * (barW + 12)}
              y2={height - height * pct + 20}
              stroke="var(--border)"
              strokeWidth={1}
              strokeDasharray="4 4"
            />
            <text
              x={pad - 6}
              y={height - height * pct + 24}
              textAnchor="end"
              fontSize={10}
              fill="var(--text-muted)"
            >
              {Math.round(max * pct)}
            </text>
          </g>
        ))}
        {data.map((d, i) => {
          const x = pad + i * (barW + 12);
          const h = (d.value / max) * height;
          return (
            <g key={i}>
              <rect
                x={x}
                y={height - h + 20}
                width={barW}
                height={h}
                rx={4}
                fill={d.color || cols[i % cols.length]}
                opacity={0.85}
              >
                <title>
                  {d.label}: {d.value}
                </title>
              </rect>
              <text
                x={x + barW / 2}
                y={height + 34}
                textAnchor="middle"
                fontSize={9}
                fill="var(--text-muted)"
                transform={`rotate(-30, ${x + barW / 2}, ${height + 34})`}
              >
                {d.label.length > 8 ? d.label.slice(0, 8) + ".." : d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  color?: string;
  suffix?: string;
}

export function StatCard({ label, value, icon, color = "blue", suffix }: StatCardProps) {
  return (
    <div className={`stat-card stat-${color}`}>
      {icon && <div className="stat-icon">{icon}</div>}
      <div>
        <div className="label">{label}</div>
        <div className="value">{value}</div>
        {suffix && (
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{suffix}</div>
        )}
      </div>
    </div>
  );
}
