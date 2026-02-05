import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import "./Charts.css";

export default function Charts({ data }) {
  const chartData = data.slice(-100);

  const configs = [
    { key: "output1", name: "Cooler condition ", color: "#2563eb" },
    { key: "output2", name: "Valve condition ", color: "#10b981" },
    { key: "output3", name: "Pump Condition", color: "#f59e0b" },
    { key: "output4", name: "Hydraulic accumulator pressure Condition", color: "#ef4444" },
  ];

  return (
    <>
      {configs.map((config) => (
        <div key={config.key} className="chart-container">
          <h3>{config.name}</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="start_time"
                stroke="#64748b"
                fontSize={10}
                tick={{ fill: '#64748b', dy: -10 }}
                tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                axisLine={false}
                tickLine={false}
                minTickGap={30}
              />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} width={35} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '0.8rem' }}>Cycle: {payload[0].payload.cycle_id}</p>
                        <p style={{ margin: '4px 0 0', fontWeight: 'bold', color: config.color }}>
                          {config.name}: {payload[0].value}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey={config.key}
                name={config.name}
                stroke={config.color}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </>
  );
}
