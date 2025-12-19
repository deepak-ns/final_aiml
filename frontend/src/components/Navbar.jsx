import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import "./Navbar.css";

export default function Navbar({ operator, logout }) {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">Intelligent Predictive Hydraulic Maintenance</h1>
      </div>

      <div className="navbar-right">
        <span className="operator">Operator: {operator.operator_name || operator.operator_id}</span>
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link to="/chatbot" className={location.pathname === "/chatbot" ? "active" : ""}>
          AI Chatbot
        </Link>
        <Link to="/reports" className={location.pathname === "/reports" ? "active" : ""}>
          Reports
        </Link>
        <button onClick={logout}>
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  );
}
