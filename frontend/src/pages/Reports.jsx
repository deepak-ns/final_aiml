import { useState } from "react";
import { generateReport } from "../services/reportApi";
import "./Reports.css";

export default function Reports() {
    const [machineId, setMachineId] = useState("");
    const [loading, setLoading] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);

    const handleGenerate = async () => {
        if (!machineId) return;
        setLoading(true);
        setPdfUrl(null);
        try {
            const blob = await generateReport(machineId);
            const url = window.URL.createObjectURL(blob);
            setPdfUrl(url);
        } catch (error) {
            console.error("Failed to generate report", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reports-container">
            <div className="reports-header">
                <h2>Maintenance Reports</h2>
            </div>

            <div className="report-card">
                <label>Machine ID</label>
                <input
                    type="number"
                    value={machineId}
                    onChange={(e) => setMachineId(e.target.value)}
                    placeholder="Enter Machine ID"
                />

                <button onClick={handleGenerate} disabled={loading}>
                    {loading ? "Generating..." : "Generate Report"}
                </button>
            </div>

            {pdfUrl && (
                <div className="pdf-viewer">
                    <iframe src={pdfUrl} title="Maintenance Report" width="100%" height="600px" />
                </div>
            )}
        </div>
    );
}
