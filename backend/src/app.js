import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import machineRoutes from "./routes/machine.routes.js";
import outputRoutes from "./routes/output.routes.js";
import chatbotRoutes from "./routes/chatbot.routes.js"; // ✅ ADD THIS
import reportRoutes from "./routes/report.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/machines", machineRoutes);
app.use("/api/outputs", outputRoutes);
app.use("/api/chatbot", chatbotRoutes); // ✅ ADD THIS
app.use("/api/reports", reportRoutes);

export default app;
