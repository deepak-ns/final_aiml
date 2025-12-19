import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import Reports from "./pages/Reports";
import Navbar from "./components/Navbar";

function App() {
  const [operator, setOperator] = useState(null);

  const logout = () => setOperator(null);

  if (!operator) {
    return <Login setOperator={setOperator} />;
  }

  return (
    <>
      <Navbar operator={operator} logout={logout} />
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home operator={operator} />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
