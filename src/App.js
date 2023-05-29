import { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';

// Database
import { db, auth } from './firebase-config';
import { getDatabase, ref, child, get } from "firebase/database";

//PAGES
import Login from './pages/Login.js';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NavbarDefault from './pages/components/navbarDefault.js';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Segoe UI',
      textTransform: 'none',
      fontSize: 16,
    },
  },
});

function App() {

  return (
      <div fontFamily='Helvetica'>
        {/* <NavbarDefault /> */}
        <Router>
            <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Dashboard />} exact />
        
          </Routes>
        </Router>
    </div>
  );
}

export default App;
