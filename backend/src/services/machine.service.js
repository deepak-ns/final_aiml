import pool from "../config/db.js";

export const fetchMachines = async (operatorId) => {
  const result = await pool.query(
    "SELECT * FROM machines WHERE operator_id = $1",
    [operatorId]
  );
  return result.rows;
};
