import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContexts } from "../useContext/ContextsProvider";
import { apiRequest } from "../apiRequest";

const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [userInput, setUserInput] = useState({});
  const [errorText, setErrorText] = useState('')
  const { setLoggedUser } = useContexts()

  const navigate = useNavigate("");

  // Sets the username and password into an object
  const handleLogin = async (e) => {
    e.preventDefault();
    if (
      (username && username.length >= 3 && username.length <= 100) &&
      (password && password.length >= 3 && password.length <= 16)
    ) {
        const base64password = btoa(password)
        const formData = new URLSearchParams();
        formData.append('username', username)
        formData.append('password', base64password)
        const data = await apiRequest('POST', 'http://172.20.10.3:8000/users/login/token', formData)
        console.log(data);
        if(data.message){
          setMessage(data);
        } else {
          setErrorText('Username or password are incorrect.')
        }
    } else {
      setErrorText('Password must be 3-16 characters.');
    }
  };

  // Gets the user data from the token
  const fetchUserData = async () => {
      const data = await apiRequest('GET', "http://172.20.10.3:8000/users/tokenData")
      if(data.userData){
        setLoggedUser(data.userData);
        return true;
      } else {
        setLoggedUser({})
        return false;
      }
  };

  // Logs the user out 
  const handleLogout = async () => {
      const data = await apiRequest('GET', 'http://127.0.0.1:8000/users/logout')
      console.log(data);
      setLoggedUser({})
      navigate('/')
  }

  // logs the user in with the user data that google token gave us
  const googleLogin = async (userData) => {
    const data = await apiRequest('POST', "http://127.0.0.1:8000/users/googleLogin", userData);
    if(data.userData){
      setLoggedUser(data.userData);
    } else {
      setLoggedUser({})
    }
  }

  return { userInput, message, errorText, handleLogin, fetchUserData, handleLogout, setUsername, setPassword, googleLogin }
}

export default useLogin