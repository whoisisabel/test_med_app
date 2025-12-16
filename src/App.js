import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/Landing_Page/LandingPage";

function App() {
  return (
    <Router>
      <div>
        <div className="blob-cont">
          <div className="blue blob"></div>
        </div>
        <div className="blob-cont">
          <div className="blue1 blob"></div>
        </div>

        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
