import React, {useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createTheme, responsiveFontSizes } from '@mui/material';
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InstantMessage = ({sev, message}) =>  {
    
        const [open, setOpen] = useState(true); 
        //Leave this true since we are not using a button
    
        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
        
            setOpen(false);
          };

    return (
      <ThemeProvider theme={theme}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={sev}>{message}</Alert>
        </Snackbar>
      </ThemeProvider>
    )
}

export default InstantMessage