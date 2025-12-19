import express from "express";
import {
  getLatestOutput,
  getOutputHistory,
} from "../controllers/output.controller.js";

const router = express.Router();

router.get("/latest/:machineId", getLatestOutput);
router.get("/history/:machineId", getOutputHistory);

export default router;
