import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Box,
  Alert,
} from "@mui/material";
import useLogin from "../hooks/useLogin";
import { useContexts } from "../useContext/ContextsProvider";
import GoogleLogin from "./components/GoogleLogin";

const Login = () => {
  const { message, errorText, handleLogin, fetchUserData, setUsername, setPassword } = useLogin()
  const { loggedUser } = useContexts()
  const navigate = useNavigate('/')

  useEffect(() => {
    if (message !== '') {
      fetchUserData();
    }
  }, [message]);

  useEffect(() => {
    if (loggedUser.role == "user") {
      navigate("/todolist");
    } if (loggedUser.role == "admin") {
      navigate("/admintodolist");
    }
  }, [loggedUser])

  
  return (
    <>
      {errorText !== '' && <Alert severity="error">
        {errorText}
      </Alert>}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Logggg In
            </Typography>
            <Box component="form" onSubmit={(e) => handleLogin(e)} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="email"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
            </Box>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Typography variant="body2">
                Don't have an account? Sign Up
              </Typography>
            </Link>
            <GoogleLogin/>
          </Box>
        </Container>
      </Box>


    </>
  );
};

export default Login;
