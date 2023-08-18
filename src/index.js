import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<h1>Test - But not a good approch</h1>} />
    </Routes>
  </Router>
);

function Home() {
  return (
    <div>
      <h1>Home Route</h1>
    </div>
  );
}

reportWebVitals();
