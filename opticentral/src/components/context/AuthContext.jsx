import React from "react";
import { setLocalStorage } from "../services/LocalStorage";
import { useState, createContext, } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [dataName, setDataName]=useState();
    const [dataToken, setDataToken]= useState();

    const login = (userData) => {
        
        if(userData.status===200 && userData.body.auth){
            setLocalStorage('authData', userData.body)

            setIsLoggedIn(true);   
                 
        }else{
            logout()
        }    

    };

    const logout = () => {
        setIsLoggedIn(false)
    }
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>

            {children}
            
        </AuthContext.Provider>

    )
}

export { AuthContext, AuthProvider }
