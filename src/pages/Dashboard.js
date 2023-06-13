import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import BarChart from "./components/BarChart";

// Database
import { db, auth } from '../firebase-config';
import { getDatabase, ref, child, get } from "firebase/database";

// Styling
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import NavbarDefault from "./components/navbarDefault";
import Box from '@mui/material/Box';
import {CardActionArea, CircularProgress, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';

let theme = createTheme({
  typography: {
    fontFamily: [
      'Segoe UI', 
      'sans-serif',
    ].join(','),
  },
});

theme = responsiveFontSizes(theme);
var WeeklyTotal = 0;
var loading = true

function Dashboard() {
  // STYLES
  const bannerStyle = { width: "100%", maxHeight: "40vh", minHeight: "100px", objectFit: "cover", objectPosition: "center", filter: "brightness(0.6)" };
  const bannerText = { color: "white", position: "absolute", top: "60%", left: "30%", transform: "translate(-50%, -50%)", textAlign: "left" };
  const cardIcon = { float:"right", opacity:"40%" };
  const gridStyle1 = { flexGrow: 1, paddingBottom: 2, paddingRight: 2, marginTop: 2, marginLeft: "auto", marginRight: "auto", maxWidth: 1, alignItems: "center" };
  const gridStyle2 = {flexGrow: 1, paddingBottom: 2, paddingRight: 2, marginBottom: 2, marginLeft: "auto", marginRight: "auto", maxWidth: 1, alignItems: "center" };
  const cardStyle = { width: 1, height: "100%", boxShadow: 5, minHeight: "100%", maxWidth: "900px", borderRadius: '16px'};
  const cardActionAreaStyle = {':hover':{color:'blue'}};

  // FEATS
  const [intakeDay, setIntakeDay] = useState();
  const [intakeWeek, setIntakeWeek] = useState(0);
  const [intakePerDay, setIntakePerDay] = useState([]);
  const dbRef = ref(db);

  let navigate = useNavigate();
    
  // USER AUTHENTICATION
  useEffect(() => {
    const loggedInUser = localStorage.getItem("isAuth");

    // // DISPLAYS USER'S IDENTIFIER
    // const user = auth.currentUser;
    // console.log(user.displayName);

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
        <CircularProgress sx = {{color: '#146C94'}} size = "10rem" variant="determinate" {...props} />
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
    <ThemeProvider theme={theme}>

    {/* NAVIGATION BAR */}
    <NavbarDefault />

    {/* INSTANTIATE GRID ROW 1*/}
    <Grid container direction="row" justifyContent="center" height="50%" spacing={2} sx={gridStyle1}>

      {/* UPPER LEFT - WELCOME */}
      <Grid item xs={12} sm={12} md={7} lg={4}>
        <Card sx={cardStyle}>
          <CardActionArea sx ={cardActionAreaStyle}>

            {/* TEXT */}
            <CardContent>
              <Typography gutterBottom variant="h4" component="div"  marginLeft={3}>
                <b>Welcome, testing!</b>
              </Typography>
              <Typography variant="h6" color="text.secondary" marginLeft={3}>
                You're doing great!
              </Typography>
            </CardContent>

          </CardActionArea>
        </Card>
      </Grid>

      {/* UPPER RIGHT - BAR CHART */}
      <Grid item xs={12} sm={12} md={7} lg={4}>
        <Card sx={cardStyle}>
        <CardActionArea sx ={cardActionAreaStyle}>
            <CardContent>
              <BarChart />
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>

    {/* INSTANTIATE GRID ROW 2*/}
    <Grid container direction="row" justifyContent="center" spacing={2} sx={gridStyle2}>

      {/* LOWER LEFT - TICKET STATUS */}
      <Grid item xs={12} sm={12} md={7} lg={4}>
        <Card sx={cardStyle}>
          <CardActionArea sx ={cardActionAreaStyle}>

            {/* TEXT */}
            <CardContent>
              <Typography gutterBottom variant="h6" component="div"  marginLeft={3}>
                <b>DAILY INTAKE</b>
              </Typography>
              <Typography variant="h6" color="text.secondary" marginLeft={3}>
                {Math.trunc(intakeDay)} mL
              </Typography>
              {intakeDay>=2500?
               <Typography variant="h6" color="text.secondary" marginLeft={3}>
                You have reached the recommended water intake for the day!
               </Typography>:
               <CardContent align="center">
                {CircularProgressWithLabel({value:(intakeDay/2500)*100})}
               </CardContent>
              }
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      {/* LOWER RIGHT - FAQs */}
      <Grid item xs={12} sm={12} md={7} lg={4}>
        <Card sx={cardStyle}>
          <CardActionArea sx ={cardActionAreaStyle}>
            {/* TEXT */}
            <CardContent>
              <Typography gutterBottom variant="h6" component="div"  marginLeft={3}>
                <b>AVG WEEKLY INTAKE</b>
              </Typography>
              <Typography variant="h6" color="text.secondary" marginLeft={3}>
              {Math.trunc(intakeWeek/7)} mL
              </Typography>
              {intakeWeek>=17500?
               <Typography variant="h6" color="text.secondary" marginLeft={3}>
                You have reached the recommended water intake for the week!
               </Typography>:
               <CardContent align="center">
                {CircularProgressWithLabel({value:(intakeWeek/(2500*7))*100})}
               </CardContent>
              }
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  </ThemeProvider>
  )
}

export default Dashboard