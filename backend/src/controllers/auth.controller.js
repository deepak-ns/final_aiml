import pool from "../config/db.js";

export const login = async (req, res) => {
  const { operator_id } = req.body;

  const result = await pool.query(
    "SELECT * FROM operators WHERE operator_id = $1",
    [operator_id]
  );

  if (result.rows.length === 0) {
    return res.status(401).json({ message: "Invalid Operator ID" });
  }

  res.json({
    message: "Login successful",
    operator: result.rows[0],
  });
};
