import { createContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

export const LoginContextComponent = createContext();

const LoginContext = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const location = useLocation();

    useEffect(() => {
        async function checkLogin() {
            let response = await fetch(`${import.meta.env.VITE_API_URL}/user/dashboard`, {
                credentials:'include'
            })
            let data = await response.json()

            if (data.success) {
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
            }
        }

        checkLogin();
    },[location.pathname])
  return (
      <LoginContextComponent.Provider value={{isLoggedIn, setIsLoggedIn}}>
          {props.children}
    </LoginContextComponent.Provider>
  )
}

export default LoginContext
