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

  // prints the Intake amount of testAccount1
  const dbRef = ref(db);
  get(child(dbRef, `testAccount1/Intake`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

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
