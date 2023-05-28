import { React, useState, useEffect }from 'react';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import NavbarDefault from "./components/navbarDefault";
import InstantMessage from './components/InstantMessage.js';
import { LinearProgress, createTheme, responsiveFontSizes } from '@mui/material';
import { Stack } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

let theme = createTheme({
    typography: {
      fontFamily: [
        'Segoe UI', 
        'sans-serif',
      ].join(','),
    }
  });

theme = responsiveFontSizes(theme);

function Login({ setIsAuth }) {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setPassword] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(function () { 
        setLoading(false); 
        }, 1000)
    }, [])

    const [EmailError, NewEmailError] = useState(false);
    const [PasswordError, NewPasswordError] = useState(false);

    const [instant, setInstant] = useState(false); // Controls Alert
    const [severity, setSeverity] = useState(''); // Controls Severity
    const [message, setMessage] = useState('') // Controls Message

    const [EmailHT, NewEmailHT] = useState("");
    const [PasswordHT, NewPasswordHT] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("isAuth");

        if (loggedInUser === "true") { 
        navigate("/");
        }
    },[])

    const logIn = async () => {
        try {
          const user = await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
          );
          localStorage.setItem("isAuth", "true");
          localStorage.setItem("userEmail",loginEmail)
          //setIsAuth("true");
          console.log("panget")
          navigate("/");
        } catch (error) {
          return error;
        }
    }

    const logoStyle = { width: '70%', height: 'auto', maxWidth: '500px', maxHeight: '500px', display: 'block', marginLeft: 'auto', marginRight: 'auto' };
    const buttonStyle = { mt:1, mb:2, bgcolor: '#7B1113', ":hover": {bgcolor: "#5A0C0E", color: 'white'}};
    const cardStyle = { maxWidth: 600, padding: "10px 5px", margin: "0 auto", justifyContent:'center' };

    // var email = "testing@gmail.com"
    // var password = "testingpass"
    // logIn(email,password)

    if (loading){
        return(
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Stack spacing={10}>
                <div sx={{ maxWidth: '500px', width: '70%', display: 'flex', justifyContent: 'center' }}>
                <LinearProgress color="inherit" position="relative"/>
                </div>
            </Stack>
        </Box>
        )
    }
    else {
        return (
            <ThemeProvider theme={theme}>

            {/* NAVIGATION BAR */}
                <NavbarDefault /> 

                <Box style={{ display:'flex', justifyContent:'center'}}>
                    <Grid sx={{mx:5, my:20}}>
                    <Card sx={{boxShadow:5, mb:3}} style={cardStyle}>
                        <CardContent>
                        {instant ?  <InstantMessage sev = {severity} message = {message} /> : `` }
                        <Typography align = "center" fontWeight="bold" component="h1" variant="h5" sx={{ mt: 3, mb:5 }}>
                            LOGIN TO YOUR DRINKUP ACCOUNT
                        </Typography>
                        <form>
                            <Grid container spacing={1}>
        
                            <Grid item xs={12}>
                                <TextField type="email" placeholder="YourEmail@email.com" label="Email" variant="outlined" helperText = {EmailHT} fullWidth required 
                                onChange={(event) => {
                                setInstant(false); 
                                setLoginEmail(event.target.value);
                                if (event.target.value === "" || ! event.target.value.match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/)){
                                    NewEmailHT("Enter a valid email");
                                    NewEmailError(true);
                                }
                                else{
                                    NewEmailHT("")
                                    NewEmailError(false);
                                }
                                }}
                                error = {EmailError}
                                />
                            </Grid>
        
                            <Grid item xs={12}>
                                <TextField type="password" placeholder="Enter your password" label="Password" variant="outlined" helperText = {PasswordHT} fullWidth required 
                                onChange={(event) => {
                                setInstant(false); 
                                setPassword(event.target.value);
                                if (event.target.value === "" || event.target.value.length < 3){
                                    NewPasswordHT("Enter a password");
                                    NewPasswordError(true);
                                }
                                else{
                                    NewPasswordHT("")
                                    NewPasswordError(false);
                                }
                                }}
                                error = {PasswordError}
                                />
                            </Grid>
        
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" sx={buttonStyle} fullWidth
                                onClick={e => {
                                e.preventDefault()
                                if(loginEmail  && loginPassword && !(EmailError  || PasswordError)){
                                    setInstant(false); 
                                    logIn()
                                    // .then(content=>{
                                    //     if(content.code === "auth/wrong-password" || content.code === "auth/user-not-found"){
                                    //     setMessage("Invalid account or password. Please try again.");
                                    //     setSeverity("error")
                                    //     setInstant(true);
                                    //     }
                                    // })
                                    // setInstant(false); 
                                }
                                else{
                                    setMessage("Please enter a valid email address and password.")
                                    setSeverity("error")
                                    setInstant(true); 
                                    if (loginEmail === ""){
                                    NewEmailError(true);
                                    NewEmailHT("Enter a valid email");
                                    }
                                    if (loginPassword === ""){
                                    NewPasswordHT("Enter a password");
                                    NewPasswordError(true);
                                    }
                                }
                                }}
                                >
                                Submit
                                </Button>
                            </Grid>
                            </Grid>
                        </form>
                        </CardContent>
                    </Card>
                    </Grid>
            </Box>  
            </ThemeProvider>
        )
    }
}

export default Login