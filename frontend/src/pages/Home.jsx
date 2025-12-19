import { useEffect, useState } from "react";
import api from "../services/api";
import "./Home.css";
import MachineSelector from "../components/MachineSelector";
import StatCard from "../components/StatCard";
import Charts from "../components/Charts";
import InfoCard from "../components/InfoCard";

export default function Home({ operator }) {
  const [machines, setMachines] = useState([]);
  const [history, setHistory] = useState([]);
  const [latest, setLatest] = useState(null);
  const [selectedMachineName, setSelectedMachineName] = useState("");

  /* New state to track selected machine ID for polling */
  const [selectedMachineId, setSelectedMachineId] = useState(null);

  useEffect(() => {
    api
      .get(`/machines/${operator?.operator_id}`)
      .then((res) => setMachines(res.data));
  }, [operator]);

  // Polling effect
  useEffect(() => {
    if (!selectedMachineId) return;

    const fetchData = async () => {
      try {
        const historyRes = await api.get(`/outputs/history/${selectedMachineId}`);
        const latestRes = await api.get(`/outputs/latest/${selectedMachineId}`);
        setHistory(historyRes.data);
        setLatest(latestRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Initial fetch
    fetchData();

    // Set up polling
    const intervalId = setInterval(fetchData, 5000);

    // Cleanup
    return () => clearInterval(intervalId);
  }, [selectedMachineId]);

  const handleSelect = async (machineId) => {
    if (!machineId) {
      setLatest(null);
      setHistory([]);
      setSelectedMachineName("");
      setSelectedMachineId(null);
      return;
    }

    const selectedMachine = machines.find(m => m.machine_id.toString() === machineId.toString());
    if (selectedMachine) {
      setSelectedMachineName(selectedMachine.machine_name);
      setSelectedMachineId(machineId);
    }
    // Fetching is now handled by the useEffect based on selectedMachineId
  };

  const getCoolerStatus = (val) => {
    if (val <= 3) return { status: "Close to total failure", color: "#ef4444" }; // Red
    if (val <= 20) return { status: "Reduced efficiency", color: "#f59e0b" }; // Amber
    return { status: "Full efficiency", color: "#10b981" }; // Green
  };

  const getValveStatus = (val) => {
    if (val <= 73) return { status: "Close to total failure", color: "#ef4444" };
    if (val <= 80) return { status: "Severe lag", color: "#f97316" }; // Orange
    if (val <= 90) return { status: "Small lag", color: "#f59e0b" };
    return { status: "Optimal switching behavior", color: "#10b981" };
  };

  const getPumpStatus = (val) => {
    if (val === 0) return { status: "No leakage", color: "#10b981" };
    if (val === 1) return { status: "Weak leakage", color: "#f59e0b" };
    return { status: "Severe leakage", color: "#ef4444" }; // val is 2
  };

  const getAccumulatorStatus = (val) => {
    if (val <= 90) return { status: "Close to total failure", color: "#ef4444" };
    if (val <= 100) return { status: "Severely reduced pressure", color: "#f97316" };
    if (val <= 115) return { status: "Slightly reduced pressure", color: "#f59e0b" };
    return { status: "Optimal pressure", color: "#10b981" };
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h2>Machine Overview</h2>
        <MachineSelector machines={machines} onSelect={handleSelect} />
      </div>

      {latest && (
        <>
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ color: "var(--color-primary)", marginBottom: "0.5rem" }}>
              Stats for: {selectedMachineName}
            </h3>
            <div style={{ fontSize: "1.2rem", color: "#334155", display: "flex", gap: "20px", alignItems: "center" }}>
              <div><strong>Cycle:</strong> {latest.cycle_id}</div>
              <div><strong>Time:</strong> {new Date(latest.start_time).toLocaleString()}</div>
            </div>
          </div>
          <InfoCard />
          <div className="dashboard-grid">
            <StatCard
              label="Cooler"
              value={latest.output1}
              {...getCoolerStatus(latest.output1)}
            />
            <StatCard
              label="Valve"
              value={latest.output2}
              {...getValveStatus(latest.output2)}
            />
            <StatCard
              label="Pump"
              value={latest.output3}
              {...getPumpStatus(latest.output3)}
            />
            <StatCard
              label="Hydraulic"
              value={latest.output4}
              {...getAccumulatorStatus(latest.output4)}
            />
          </div>
        </>
      )}

      {history.length > 0 && (
        <div className="charts-section">
          <Charts data={history} />
        </div>
      )}

    </div>
  );
}
