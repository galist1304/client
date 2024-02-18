import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useSignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userInput, setUserInput] = useState({});
  const [errorText, setErrorText] = useState('');

  // Sets the usename and password into an object
  const handleSignUp = (event) => {
    event.preventDefault();
    setUserInput((prevData) => ({ ...prevData, username, password }));
  };

  // Adds a new user to the database
  const addUser = async () => {
    if (
      (userInput.username !== undefined && userInput.username.length >= 3 && userInput.username.length <= 100) &&
      (userInput.password !== undefined && userInput.password.length >= 3 && userInput.password.length <= 16)
    ) {
      try {
        const base64password = btoa(password)
        console.log(base64password);
        userInput.password = base64password
        const { data } = await axios.post(
          "http://127.0.0.1:8000/users/signup",
          userInput,
          { withCredentials: true }
        );
        console.log(data);
        setMessage(data);
      } catch (error) {
        console.log(error);
        setErrorText('Username already in use.')
      }
    } else {
      setErrorText('Password must be 3-16 characters.')
    }
  };

  return { userInput, message, errorText, handleSignUp, addUser, setUsername, setPassword }
}
export default useSignUp