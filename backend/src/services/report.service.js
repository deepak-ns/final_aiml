import pool from "../config/db.js";

export async function getLast100Cycles(machineId) {
  const query = `
    SELECT *
    FROM model_outputs
    WHERE machine_id = $1
    ORDER BY start_time DESC
    LIMIT 100
  `;
  const { rows } = await pool.query(query, [machineId]);
  return rows;
}
