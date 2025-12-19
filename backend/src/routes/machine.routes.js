import express from "express";
import { getMachinesByOperator } from "../controllers/machine.controller.js";

const router = express.Router();
router.get("/:operatorId", getMachinesByOperator);

export default router;
