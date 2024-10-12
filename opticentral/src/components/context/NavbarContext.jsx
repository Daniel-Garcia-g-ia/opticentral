import React from "react";
import { createContext } from "react";
import { useState } from "react";
import { getLocalStorage } from "../services/LocalStorage";

const NavbarContext = createContext()


const NavbarProvider = ({ children }) => {
    const [permissonsRole, setPermissonsRole]= useState(false)

    const production = () => {
        
        const user = getLocalStorage('authData');

        if(user.role=='administrator'||'lider'){
            setPermissonsRole(true)            
        }else{
            setPermissonsRole(false)  

        }

        console.log(permissonsRole)
    }

    const discardProduction =()=>{
        setPermissonsRole(false)
    }
    return (
        <NavbarContext.Provider value={{production, permissonsRole, discardProduction}}>
            {children}


        </NavbarContext.Provider>
    )

}

export {NavbarContext, NavbarProvider }