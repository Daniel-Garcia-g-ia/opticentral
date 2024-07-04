import React from "react";
import { createContext } from "react";
import { useState } from "react";


const DateContext = createContext();


const DateProvider = ({ children }) => {

    const [dateSelected, setDateSelected]= useState("");
    const [turnSelected, setTurnSelected]= useState("");

    const dateContext =(info)=>{
        setDateSelected(info)

    }

    const turnContext = (info)=>{
        setTurnSelected(info)
    }
    


    return (

        <DateContext.Provider  value ={{dateContext, dateSelected, turnContext, turnSelected}}>
            {children}

        </DateContext.Provider>



    )

}

export { DateContext, DateProvider }




