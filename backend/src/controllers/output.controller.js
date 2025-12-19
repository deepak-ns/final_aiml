import {
  fetchLatestOutput,
  fetchOutputHistory,
} from "../services/output.service.js";

export const getLatestOutput = async (req, res) => {
  const data = await fetchLatestOutput(req.params.machineId);
  res.json(data);
};

export const getOutputHistory = async (req, res) => {
  const data = await fetchOutputHistory(req.params.machineId);
  res.json(data);
};
