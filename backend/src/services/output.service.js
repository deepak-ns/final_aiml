import pool from "../config/db.js";

export const fetchLatestOutput = async (machineId) => {
  const result = await pool.query(
    `SELECT * FROM model_outputs
     WHERE machine_id = $1
     ORDER BY start_time DESC
     LIMIT 1`,
    [machineId]
  );
  return result.rows[0];
};

export const fetchOutputHistory = async (machineId) => {
  const result = await pool.query(
    `SELECT * FROM model_outputs
     WHERE machine_id = $1
     ORDER BY cycle_id`,
    [machineId]
  );
  return result.rows;
};
