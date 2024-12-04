import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';


// components
import Navbar from './components/Navbar';
import Headads from './components/headads';
import About from './components/about';
import Products from './components/product';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <div className='pt-5'>
        <Headads />
      </div>
      <About />
      <Products />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
