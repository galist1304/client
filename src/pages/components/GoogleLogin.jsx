import React, { useEffect } from 'react'
import { jwtDecode } from "jwt-decode"
import { useContexts } from '../../useContext/ContextsProvider'
import Cookies from 'js-cookie';
import useLogin from '../../hooks/useLogin';

const GoogleLogin = () => {
    const { setLoggedUser } = useContexts()
    const { googleLogin } = useLogin()

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
          client_id: "785666814116-6s043aehflp0dj85fiu7un9fqlak91h4.apps.googleusercontent.com",
          callback: handleCallbackResponse
        })
        google.accounts.id.renderButton(
          document.getElementById("signInDiv"),
          { theme: "outline", size: "large" }
        )
      }, [])
    
      const handleCallbackResponse = (response) => {
        const googleToken = jwtDecode(response.credential)
        console.log(googleToken);
        //setLoggedUser({ username: googleToken.name, role: 'user' });
        const userData = { username: googleToken.name, role: 'user' };
        googleLogin(userData)
      }
    
    return (
        <div>
            <div id="signInDiv"></div>
        </div>
    )
}

export default GoogleLogin