import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import ".././css/index.css"
import { useNavigate } from "react-router-dom";

const Header = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();

  const handleSignOut = (e) => {
    e.preventDefault();
    setLoggedIn(false);
    navigate("/")
  }

  const handleLogin = () => {
    navigate("/login")
  }

  const handleSignUp = () => {
    navigate('/signup')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="nav-element">
          {loggedIn === false ?
            <>
              <Button color="inherit" onClick={handleLogin}>Login</Button>
              <Button className="nav-buttons" color="inherit" onClick={handleSignUp}>Sign Up</Button>
              
            </> :
              <Button className="nav-buttons" color="inherit" onClick={handleSignOut}>Sign Out</Button>
            }
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
