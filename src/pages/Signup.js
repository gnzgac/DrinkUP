import { React, useState, useEffect } from 'react';
import { auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";

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

    const [signupEmail, setLoginEmail] = useState("");
    const [signupPassword, setPassword] = useState("");
    const [loading, setLoading] = useState(true);

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
          localStorage.setItem("isAuth", "true");
          localStorage.setItem("userEmail",user.email);     
          navigate("/");
        } catch (error) {
          return error;
        }
    }

    useEffect(() => {
        setTimeout(function () { 
        setLoading(false); 
        }, 1000)
    }, [])

    // var email = "testing@gmail.com"
    // var password = "testingpass"
    // signUp(email,password)

    return (
        <div>test</div>
    )
}

export default Signup