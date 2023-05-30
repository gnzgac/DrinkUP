import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import NavbarDefault from "./components/navbarDefault";
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import {CircularProgress, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';
import BarChart from "./components/BarChart";

// Database
import { db, auth } from '../firebase-config';
import { getDatabase, ref, child, get } from "firebase/database";

// Styling
import styles from './Dashboard.module.css';

let theme = createTheme({
  typography: {
    fontFamily: [
      'Segoe UI', 
      'sans-serif',
    ].join(','),
  }
});

theme = responsiveFontSizes(theme);
var WeeklyTotal = 0;
var loading = true

function Dashboard() {

  const [intakeDay, setIntakeDay] = useState();
  const [intakeWeek, setIntakeWeek] = useState(0);
  const [intakePerDay, setIntakePerDay] = useState([])
  const dbRef = ref(db);

  let navigate = useNavigate();
    
  // USER AUTHENTICATION
  useEffect(() => {
    const loggedInUser = localStorage.getItem("isAuth");

    if (loggedInUser === "true") { 
      loading = false;
      fetchData();
    }
    else{
      navigate("/Login");
    }
  },[])

  async function fetchData() {
    //Intake for the Day
    get(child(dbRef, `testing/Intake`)).then((snapshot) => {
      if (snapshot.exists()) {
        setIntakeDay(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

    //Weekly Data
    for (let i = 0; i < 7; i++) {
      get(child(dbRef, `testing/Days/${i}`)).then((snapshot) => {
        if (snapshot.exists()) {
          setIntakePerDay((intakePerDay) => [...intakePerDay,snapshot.val()]);
          WeeklyTotal = WeeklyTotal + snapshot.val().Intake
          setIntakeWeek(WeeklyTotal)
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }
  
  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress sx = {{color: '#146C94'}} size = "5rem" variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }
  
  CircularProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
  };

  return (
    <div className={styles['container']}>
      <NavbarDefault />
      <div className={styles['content']}>
        <div>
          <Box style={{ display:'flex', justifyContent:'center' }}>
            <Grid sx={{mt:5, mb:5}}>
              <Card sx={{boxShadow:5, mb:3}} style={{ minWidth: 400, padding: "10px 5px", margin: "0 auto" }}>
                <CardContent align = "left">
                  <Typography fontWeight="bold" component="h1" variant="h5">
                    WELCOME, testing.
                  </Typography>
                  <Typography fontWeight="regular" fontStyle='italic' component="paragraph" sx = {{mb:2}} >
                    You're doing great!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            </Box>
            <Box style={{ display:'flex', justifyContent:'center' }}>
              <Grid sx={{mt:5, mb:5}}>
                <Card sx={{boxShadow:5, mb:3}} style={{ minWidth: 400, padding: "10px 5px", margin: "0 auto" }}>
                  <BarChart />
                </Card>
              </Grid>
            </Box>
        </div>
        <div>
          <Box style={{ display:'flex', justifyContent:'center' }}>
            <Grid sx={{mt:5, mb:5}}>
              <Card sx={{boxShadow:5, mb:3}} style={{ minWidth: 400, padding: "10px 5px", margin: "0 auto" }}>
                <CardContent align = "center">
                  <Typography fontWeight="bold" component="h1" variant="h5" sx = {{mb:2}} >
                    INTAKE FOR THE DAY
                  </Typography>
                  <Typography fontWeight="bold" sx = {{mb:2}}>{Math.trunc(intakeDay)} mL</Typography>
                  {CircularProgressWithLabel({value:(intakeDay/2500)*100})}
                </CardContent>
              </Card>
            </Grid>
            </Box>
            <Box style={{ display:'flex', justifyContent:'center' }}>
            <Grid sx={{mt:5, mb:5}}>
              <Card sx={{boxShadow:5, mb:3}} style={{ minWidth: 400, padding: "10px 5px", margin: "0 auto" }}>
                <CardContent align = "center">
                  <Typography fontWeight="bold" component="h1" variant="h5" sx = {{mb:2}} >
                    INTAKE FOR THE WEEK
                  </Typography>
                  <Typography fontWeight="bold" sx = {{mb:2}}>{Math.trunc(intakeWeek)} mL</Typography>
                  {CircularProgressWithLabel({value:(intakeWeek/(2500*7))*100})}
                </CardContent>
              </Card>
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default Dashboard