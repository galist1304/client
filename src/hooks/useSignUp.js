import { useState } from "react";
import { apiRequest } from "../apiRequest";

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
        const base64password = btoa(password)
        userInput.password = base64password
        const data = await apiRequest('POST', "https://192.168.9.119:8000/users/signup", userInput)
        if(data.message){
          setMessage(data);
        } else{
          setErrorText('Username already in use.')
        }
    } else {
      setErrorText('Password must be 3-16 characters.')
    }
  };

  return { userInput, message, errorText, handleSignUp, addUser, setUsername, setPassword }
}
export default useSignUp