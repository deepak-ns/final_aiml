import { getLast100Cycles } from "../services/report.service.js";
import { generateAIAnalysis } from "../services/ai.service.js";
import { generateReportPDF } from "../services/pdf.service.js";
import { interpretCycle } from "../utils/interpretation.js";

export async function generateReport(req, res) {
    try {
        const { machineId } = req.params;

        const cycles = await getLast100Cycles(machineId);
        if (!cycles.length) {
            return res.status(404).json({ error: "No data found" });
        }

        const interpretations = cycles.map(interpretCycle);
        const aiAnalysis = await generateAIAnalysis(interpretations);

        generateReportPDF(res, machineId, aiAnalysis);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Report generation failed" });
    }
}
