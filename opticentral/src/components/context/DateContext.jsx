import React from "react";
import { createContext } from "react";
import { useState } from "react";


const DateContext = createContext();


const DateProvider = ({ children }) => {

    const [dateSelected, setDateSelected]= useState("");
    const [turnSelected, setTurnSelected]= useState("");
    const [valueTimeContext, setValueTimeContext]= useState(0);

    const dateContext =(info)=>{
        setDateSelected(info)

    }

    const turnContext = (info)=>{
        setTurnSelected(info)
    }

    const totalTimeContext=(info)=>{
        setValueTimeContext(info)
    }

    


    return (

        <DateContext.Provider  value ={{dateContext, dateSelected, turnContext, turnSelected, totalTimeContext, valueTimeContext}}>
            {children}

        </DateContext.Provider>



    )

}

export { DateContext, DateProvider }




