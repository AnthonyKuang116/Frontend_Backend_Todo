import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import ".././css/index.css"
import { NavLink } from "react-router-dom";

const Header = ({ loggedIn, setLoggedIn }) => {
  const handleSignOut = (e) => {
    e.preventDefault();
    setLoggedIn(false);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="nav-element">
          {loggedIn === false ?
            <>
              <NavLink to="/"><Button color="inherit">Login</Button></NavLink>
              <NavLink to="signup"><Button className="nav-buttons"color="inherit">Sign Up</Button></NavLink>
              
            </> :
              <NavLink to="/"><Button className="nav-buttons" color="inherit" onClick={handleSignOut}>Sign Out</Button></NavLink>
            }
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
