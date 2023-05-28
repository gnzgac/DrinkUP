import {React, useState} from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import NavbarDefault from "./components/navbarDefault";
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';

// Database
import { db, auth } from '../firebase-config';
import { getDatabase, ref, child, get } from "firebase/database";

function Dashboard() {

  const [intakeData, setIntakeData] = useState();
  const dbRef = ref(db);
  
  // prints the Intake amount of testAccount1
  get(child(dbRef, `testing/Intake`)).then((snapshot) => {
    if (snapshot.exists()) {
      setIntakeData(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  
  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress sx = {{color: '#0A324F'}} size = "5rem" variant="determinate" {...props} />
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
    <div>
      <NavbarDefault /> 
      <Box style={{ display:'flex', justifyContent:'center' }}>
        <Grid sx={{mt:5, mb:5}}>
          <Card sx={{boxShadow:5, mb:3}} style={{ minWidth: 400, padding: "10px 5px", margin: "0 auto" }}>
            <CardContent align = "center">
              <Typography fontWeight="bold" component="h1" variant="h5" fontFamily="Segoe UI" sx = {{mb:2}} >
                INTAKE FOR THE DAY
              </Typography>
              <Typography>{intakeData} mL</Typography>
              {CircularProgressWithLabel({value:80})}
            </CardContent>
          </Card>
        </Grid>
      </Box>
      <Box style={{ display:'flex', justifyContent:'center' }}>
        <Grid sx={{mt:5, mb:5}}>
          <Card sx={{boxShadow:5, mb:3}} style={{ minWidth: 400, padding: "10px 5px", margin: "0 auto" }}>
            <CardContent align = "center">
              <Typography fontWeight="bold" component="h1" variant="h5" fontFamily="Segoe UI" sx = {{mb:2}} >
                INTAKE FOR THE WEEK
              </Typography>
              <Typography>{intakeData} mL</Typography>
              {CircularProgressWithLabel({value:80})}
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </div>
  )
}

export default Dashboard