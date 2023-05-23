import { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';

//PAGES
import Login from './pages/Login.js';
import Logout from './pages/Logout';
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
  const [isAuth, setIsAuth] = useState(false);

  return (
      <div fontFamily='Helvetica'>
        {/* <NavbarDefault /> */}
        <Router>
            <Routes>
            <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<Dashboard />} exact />
            {/* element={<DBAdmin isAuth={isAuth}/>} */}
          </Routes>
        </Router>
    </div>
  );
}

export default App;
