import { React, useState, useEffect } from 'react';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

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

function Signup() {
    
    let navigate = useNavigate();

    const [signupEmail, setSignUpEmail] = useState("");
    const [signupIdentifier, setIdentifier] = useState("");
    const [signupPassword, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [EmailError, NewEmailError] = useState(false);
    const [IdentifierError, NewIdentifierError] = useState(false);
    const [PasswordError, NewPasswordError] = useState(false);
    const [ConfirmPasswordError, NewConfirmPasswordError] = useState(false);

    const [instant, setInstant] = useState(false); // Controls Alert
    const [severity, setSeverity] = useState(''); // Controls Severity
    const [message, setMessage] = useState('') // Controls Message

    const [EmailHT, NewEmailHT] = useState("");
    const [IdentifierHT, NewIdentifierHT] = useState("");
    const [PasswordHT, NewPasswordHT] = useState("");
    const [ConfirmPasswordHT, NewConfirmPasswordHT] = useState("");

    const [disabledConfirm, setDisabledConfirm] = useState(true)

    // function signUp(email,password){
    //     createUserWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //         const user = userCredential.user;
    //         localStorage.setItem("isAuth", "true");
    //         localStorage.setItem("userEmail",user.email);           
    //          // signed up and logged in
    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    
    //         console.log(errorMessage)
    //     })
    // }

    const signUp = async () => {
        try {
          const user = await createUserWithEmailAndPassword(
            auth, 
            signupEmail, 
            signupPassword
          );
        
        // // FOR ASSIGNING USER'S IDENTIFIER
        //   await updateProfile(auth.currentUser, {
        //     displayName: "test",
        //   });

          localStorage.setItem("isAuth", "true");
          localStorage.setItem("userEmail",user.email);     
          navigate("/");
        } catch (error) {
          return error;
        }
    }

    const buttonStyle = { mt:1, mb:2, bgcolor: '#146C94', ":hover": {bgcolor: "#19A7CE", color: 'white'}};
    const cardStyle = { maxWidth: 600, padding: "10px 5px", margin: "0 auto", justifyContent:'center' };

    // var email = "testing@gmail.com"
    // var password = "testingpass"
    // signUp(email,password)

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
                        SIGN UP FOR A DrinkUP ACCOUNT
                    </Typography>
                    <form>
                        <Grid container spacing={1}>
    
                        <Grid item xs={12}>
                            <TextField type="email" placeholder="YourEmail@email.com" label="Email" variant="outlined" helperText = {EmailHT} fullWidth required 
                            onChange={(event) => {
                            setInstant(false); 
                            setSignUpEmail(event.target.value);
                            if (event.target.value === "" || ! event.target.value.match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/)){
                                NewEmailHT("Enter a valid email.");
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
                            <TextField type="ID" placeholder="productIdentifier" label="Product Identifier" variant="outlined" helperText = {IdentifierHT} fullWidth required 
                            onChange={(event) => {
                            setInstant(false); 
                            setIdentifier(event.target.value);
                            if (event.target.value === ""){
                                NewIdentifierHT("Enter a valid product identifier.");
                                NewIdentifierError(true);
                            }
                            else{
                                NewIdentifierHT("")
                                NewIdentifierError(false);
                            }
                            }}
                            error = {IdentifierError}
                            />
                        </Grid>
    
                        <Grid item xs={12}>
                            <TextField type="password" placeholder="Enter your password" label="Password" variant="outlined" helperText = {PasswordHT} fullWidth required 
                            onChange={(event) => {
                            setConfirmPassword("")
                            setInstant(false); 
                            setPassword(event.target.value);
                            if (event.target.value === "" || event.target.value.length < 8){
                                NewPasswordHT("Password must be at least 8 characters.");
                                NewPasswordError(true);
                                setDisabledConfirm(true);
                            }
                            else{
                                NewPasswordHT("")
                                NewPasswordError(false);
                                setDisabledConfirm(false);
                            }
                            }}
                            error = {PasswordError}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField type="password" value={confirmPassword} disabled={disabledConfirm} placeholder="Re-enter your password" label="Confirm Password" variant="outlined" helperText = {ConfirmPasswordHT} fullWidth required 
                            onChange={(event) => {
                            setInstant(false); 
                            setConfirmPassword(event.target.value);
                            if (event.target.value !== signupPassword){
                                NewConfirmPasswordHT("Password does not match.");
                                NewConfirmPasswordError(true);
                            }
                            else{
                                NewConfirmPasswordHT("")
                                NewConfirmPasswordError(false);
                            }
                            }}
                            error = {ConfirmPasswordError}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" sx = {buttonStyle} fullWidth
                            onClick={e => {
                            e.preventDefault()
                            if(signupEmail  && signupIdentifier && signupPassword && confirmPassword && !(EmailError || IdentifierError  || PasswordError || ConfirmPasswordError)){
                                signUp()
                            }
                            else{
                                setMessage("Please enter valid email or password.")
                                setSeverity("error")
                                setInstant(true); 
                                if (signupEmail === ""){
                                    NewEmailError(true);
                                    NewEmailHT("Enter a valid email");
                                }
                                if (signupIdentifier === ""){
                                    NewIdentifierError(true);
                                    NewIdentifierHT("Enter a valid product identifier.");
                                }
                                if (signupPassword === ""){
                                    NewPasswordHT("Enter a password.");
                                    NewPasswordError(true);
                                }
                            }
                            }}
                            >
                            CREATE ACCOUNT
                            </Button>
                            <Typography component="h1" variant="caption" align="center" sx={{ mt: 1, mb: 1 }} fontFamily="Segoe UI">
                                Have an account already? <a href= "/Login" style={{color: '#146C94'}}>Log in here.</a>
                            </Typography>
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

export default Signup