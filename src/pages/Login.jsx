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

const Login = () => {
  const { userInput, message, errorText, handleLogin, login, fetchUserData, setUsername, setPassword } = useLogin()
  const { loggedUser } = useContexts()
  const navigate = useNavigate('/')

  useEffect(() => {
    if (userInput.username && userInput.password) {
      login()
    }
  }, [userInput]);

  useEffect(() => {
    if(message !== ''){
      fetchUserData();
    }
  }, [message]);

  useEffect(() => {
    if (userInput.username !== undefined) {
      if (loggedUser.role == "user") {
        console.log("user");
        navigate("/todolist");
      } if (loggedUser.role == "admin") {
        console.log("admin");
        navigate("/admintodolist");
      }
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
              Log In
            </Typography>
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
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
          </Box>
        </Container>
      </Box>


    </>
  );
};

export default Login;
