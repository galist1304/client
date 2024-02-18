import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContexts } from "../useContext/ContextsProvider";


const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userInput, setUserInput] = useState({});
  const [errorText, setErrorText] = useState('')
  const { setLoggedUser } = useContexts()

  const navigate = useNavigate("");

  // Sets the username and password into an object
  const handleLogin = (event) => {
    event.preventDefault();
    setUserInput((prevData) => ({ ...prevData, username, password }));
  };

  // Logs the user in if the username and password are correct
  const login = async () => {
    if (
      (userInput.username && userInput.username.length >= 3 && userInput.username.length <= 100) &&
      (userInput.password && userInput.password.length >= 3 && userInput.password.length <= 16)
    ) {
      try {
        const base64password = btoa(password)
        console.log(base64password);
        userInput.password = base64password
        const { data } = await axios.post(
          "http://127.0.0.1:8000/users",
          userInput,
          { withCredentials: true }
        );
        console.log(data);
        setMessage(data);
      } catch (error) {
        console.log(error);
        setErrorText('Username or password are incorrect.')
      }
    } else {
      setErrorText('Password must be 3-16 characters.');
    }
  };

  // Gets the user data from the token
  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(
        "http://127.0.0.1:8000/users/tokenData",
        { withCredentials: true }
      );
      setLoggedUser(data.userData);
    } catch (error) {
      console.log(error);
      setErrorText('Unathorized')
      if (
        [
          "Token not found in cookie",
          "Invalid token",
          "Invalid token format: Not enough segments",
        ].includes(error.response.data.detail)
      ) {
        const confirm = window.confirm('You need to login in order to access this feature.')
        if (confirm) {
          navigate("/");
        }
      }
    }
  };

  // Logs the user out 
  const handleLogout = async () => {
    try {
      const { data } = await axios.get('http://127.0.0.1:8000/users/logout')
      console.log(data);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  // Alerts the user if he want to logout
  const confirmLogout = () => {
    const confirmation = window.confirm("Are you sure you want to log out?");
    if (confirmation) {
      handleLogout();
    }
  }

  return { userInput, message, errorText, handleLogin, login, fetchUserData, confirmLogout, setUsername, setPassword }
}

export default useLogin