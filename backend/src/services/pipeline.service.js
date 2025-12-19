import pool from "../config/db.js";
import { PythonShell } from "python-shell";

let isProcessing = false;

async function checkForNewData() {
    if (isProcessing) {
        console.log("⚠️ Previous batch still processing. Skipping.");
        return;
    }

    isProcessing = true;
    console.log("🔍 Checking for new data...");

    try {
        const query = `
      SELECT DISTINCT machine_id, cycle_id
      FROM ps1_data
      WHERE (machine_id, cycle_id) NOT IN (
        SELECT machine_id, cycle_id FROM model_outputs
      )
      ORDER BY machine_id ASC, cycle_id ASC;
    `;

        const result = await pool.query(query);

        if (result.rows.length === 0) {
            console.log("✅ No new cycles found.");
        } else {
            console.log(`🚀 ${result.rows.length} new cycles detected`);

            for (const row of result.rows) {
                runMLPipeline(row.machine_id, row.cycle_id);
            }
        }
    } catch (err) {
        console.error("❌ Pipeline polling error:", err.message);
    } finally {
        isProcessing = false;
    }
}

function runMLPipeline(machineId, cycleId) {
    console.log(
        `⚙️ Running ML pipeline for Machine ${machineId}, Cycle ${cycleId}`
    );

    const options = {
        pythonPath: "python",
        scriptPath: "./", // adjust if pipeline.py is elsewhere
        args: [machineId, cycleId],
    };

    PythonShell.run("pipeline.py", options, (err) => {
        if (err) {
            console.error("🔥 Python error:", err.message);
        } else {
            console.log(
                `✅ Pipeline completed for Machine ${machineId}, Cycle ${cycleId}`
            );
        }
    });
}

/**
 * Starts polling every 30 seconds
 */
export function startPipelinePolling() {
    console.log("⏱️ ML pipeline polling started (every 30 seconds)");
    setInterval(checkForNewData, 30_000);
}
