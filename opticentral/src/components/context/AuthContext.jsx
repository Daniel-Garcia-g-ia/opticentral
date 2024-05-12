import React from "react";
import { useState, createContext, } from "react";
import {Redirect} from "react-router-dom"


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [dataName, setDataName]=useState();
    const [dataToken, setDataToken]= useState();

    const login = (userData) => {
        console.log(userData)
        if(userData.status===200 && userData.body.auht){
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

            {isLoggedIn ? <Redirect to="/home" />: children}
            
        </AuthContext.Provider>

    )
}

export { AuthContext, AuthProvider }
