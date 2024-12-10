import React from "react";
import ReactDOM from "react-dom/client"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


//compnonets
import Admin from "./components/Admin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

// Create the root and render the App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
