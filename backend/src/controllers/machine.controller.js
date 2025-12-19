import { fetchMachines } from "../services/machine.service.js";

export const getMachinesByOperator = async (req, res) => {
  const machines = await fetchMachines(req.params.operatorId);
  res.json(machines);
};
