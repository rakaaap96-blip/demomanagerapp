import { Loader2 } from "lucide-react";

export default function Spinner({ size = 24 }: { size?: number }) {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "40px 0" }}
    >
      <Loader2 size={size} className="spin" />
    </div>
  );
}
