import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar';
import '../src/App.css';
import Privacy from './../src/modules/Privacy';//Home

import Home from './../src/modules/Home';
// import Blogs from './../src/modules/Blogs';
import About from './../src/modules/About';
import Contacts from './../src/modules/Contacts';
import AdminLogin from '../src/admin/AdminLogin';
import Dashboard from '../src/admin/Dashboard';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/blogs" element={<Blogs />} /> */}
         
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
};




export default App;
