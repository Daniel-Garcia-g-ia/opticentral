import React, { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import { getLocalStorage } from "../services/LocalStorage";

const NavbarContext = createContext()


const NavbarProvider = ({ children }) => {
   
    const [permissonsRole, setPermissonsRole]= useState()
    const [activateReport, setActivateReport]= useState()
    

    const production = () => {        
        
        const user = getLocalStorage('authData');      
       

        if(user.role=='administrator'||'lider'){
            setPermissonsRole(true)            
        }else{
            setPermissonsRole(false)  

        }

      
    }

    const discardProduction =()=>{
        setPermissonsRole(false)
       
    }


    const report = (state)=>{
      
        setActivateReport(state)
              
        
    }
    return (
        <NavbarContext.Provider value={{production, permissonsRole, discardProduction, report, activateReport}}>
            {children}


        </NavbarContext.Provider>
    )

}

export {NavbarContext, NavbarProvider }