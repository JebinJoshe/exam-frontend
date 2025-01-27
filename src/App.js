import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Longin from "./components/Login";
import Quiz from "./components/Quiz";
import Submit from "./components/Submit";

// Rename Route from lucide-react to avoid conflict
import { Route as LucideRoute } from "lucide-react";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to the Login page */}
        <Route path="/" element={<Navigate to="/longin" />} />

        {/* Define routes for each page */}
        <Route path="/longin" element={<Longin />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/submit" element={<Submit />} />
        
      </Routes>
    </Router>
  );
};

export default App;
