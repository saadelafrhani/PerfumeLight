import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';

// Components
import Navbar from './components/Navbar';
import Headads from './components/headads';
import About from './components/about';
import Products from './components/product';
import Admin from './components/Admin';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <div className="pt-5">
              <Headads />
              <About />
              <Products />
            </div>
          }
        />
        
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
