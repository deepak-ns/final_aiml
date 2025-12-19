import { useState } from "react";
import api from "../services/api";
import "./Login.css";

export default function Login({ setOperator }) {
  const [operatorId, setOperatorId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { operator_id: operatorId });
      setOperator(res.data.operator);
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed!");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-panel">
        <div className="login-header">
          <h1>Intelligent Predictive Hydraulic Maintenance</h1>
          <p>Operator Access Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label>Operator ID</label>
          <input
            type="number"
            placeholder="Enter operator ID"
            required
            value={operatorId}
            onChange={(e) => setOperatorId(e.target.value)}
          />

          <label>Password</label>
          <input type="password" placeholder="Enter password" required />

          <button type="submit">Sign In</button>
        </form>


      </div>
    </div>
  );
}
