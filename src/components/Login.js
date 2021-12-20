import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import { login } from "../api/index"
import { useNavigate } from "react-router-dom";

const Login = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const theme = createTheme();

  const [userInput, setUserInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const setToken = (token) => {
    localStorage.setItem("token", token);
  }
  const setUser = (user) => {
    localStorage.setItem("creator", user);
  }

  const handleUsername = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
  }

  const handlePassword = (e) => {
    e.preventDefault();
    setPasswordInput(e.target.value);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(userInput, passwordInput);
      console.log("token", user.data.token);
      console.log("userId", user.data.userId);
      setToken(user.data.token);
      setUser(user.data.userId);
      setLoggedIn(true);
      navigate("/todoList");
    } catch (error) {
      alert("Incorret username or password!")
      console.log(error);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={userInput}
              onChange={handleUsername}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={passwordInput}
              onChange={handlePassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;