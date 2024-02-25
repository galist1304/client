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
import useSignUp from "../hooks/useSignUp";

const SignUp = () => {
  const { userInput, message, errorText, handleSignUp, addUser, setUsername, setPassword } = useSignUp()
  const navigate = useNavigate('/')

  useEffect(() => {
    if (userInput.username) {
      addUser();
    }
  }, [userInput]);

  useEffect(() => {
    if (message !== '') {
      navigate('/')
    }
  }, [message]);

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
          minHeight: "100vh"
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
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSignUp} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="usename"
                label="Username"
                name="username"
                autoComplete="username"
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
                Sign Up
              </Button>
            </Box>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography variant="body2">
                Already have an account? Log In
              </Typography>
            </Link>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SignUp;
