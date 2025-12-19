import "./StatCard.css";
import { TrendingUp } from "lucide-react";

export default function StatCard({ label, value, status, color }) {
  return (
    <div className="stat-card">
      <h3>{label}</h3>
      <div className="value">
        {typeof value === "number" ? value.toFixed(2) : value ?? "N/A"}
      </div>
      {status && (
        <div className="status" style={{ color: color || "#64748b", marginTop: "8px", fontSize: "1.25rem", fontWeight: "500" }}>
          {status}
        </div>
      )}
    </div>
  );
}
