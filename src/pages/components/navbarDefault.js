import React, {useState} from 'react';
import '../../App.css';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Stack,
  CssBaseline,
} from "@mui/material";
import { display } from '@mui/system';
import { Box, Hidden } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import DrinkUP_logo from '../images/logo_white_transparent.png';

const NavbarDefault = (props) => {
  const [open, setOpen] = useState(false);
  const loggedInUser = localStorage.getItem("isAuth");

  return (
    <AppBar position='static' style={{ background: '#F8F9FA', backgroundColor: "#146C94"}}>
      <Container sx={{ p:2 }} maxWidth="xl" className="font-link">
        <Toolbar>
            <IconButton size='small' edge='start' variant="contained" aria-label='logo'>
                <a href="/"><img src={DrinkUP_logo} alt="logo" height="50" width="50"/></a>
            </IconButton>
            
            <Typography 
              variant='h4'
              component='div'
              fontWeight={700}
              fontSize="2.25rem"
              padding={2}
              style={{ color: "white"}} sx={{flexGrow:1}}
            >
              <Box component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
              <a href="/" style={{color: "white", textDecoration: "none"}}>DrinkUP</a>
              </Box>
            </Typography>
            <Hidden lgDown>
              <Stack direction="row" spacing={3}>
                <Button variant="text" sx={{":hover": {color:"#16241f"}}}><a href="/" style={{textDecoration: 'none', color: "white"}}>Home</a></Button>
                {(loggedInUser === "true") ?
                <Button variant="text" sx={{":hover": {color:"#16241f"}}}><a href="/Logout" style={{textDecoration: 'none', color: "white"}}>Logout</a></Button>:
                <Button variant="text" sx={{":hover": {color:"#16241f"}}}><a href="/Login" style={{textDecoration: 'none', color: "white"}}>Login</a></Button>}
                </Stack >
            </Hidden>
            <Hidden lgUp>
              <IconButton>
                <MenuIcon fontSize='large' sx={{color: '#FFFFFF'}} onClick={() => setOpen(true)}/>
              </IconButton>
            </Hidden>
          <CssBaseline />
        </Toolbar>
      </Container>
      <Hidden lgUp>
        <SwipeableDrawer anchor="right" open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
          <div spacing={2}>
            <IconButton>
                <ChevronRightIcon onClick={() => setOpen(false)}/>
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem><Button variant="text" sx={{":hover": {color:"#7B1113"}}}><a href="/" style={{textDecoration: 'none', color: "black"}}>Home</a></Button></ListItem>
            {(loggedInUser === "true") ?
                <ListItem><Button variant="text" sx={{":hover": {color:"#7B1113"}}}><a href="/Logout" style={{textDecoration: 'none', color: "black"}}>Logout</a></Button></ListItem>:
                <ListItem><Button variant="text" sx={{":hover": {color:"#7B1113"}}}><a href="/Login" style={{textDecoration: 'none', color: "black"}}>Login</a></Button></ListItem>}
          </List>
        </SwipeableDrawer>
      </Hidden>
    </AppBar>
    )
}

export default NavbarDefault;