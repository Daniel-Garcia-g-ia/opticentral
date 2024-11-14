import React from "react";
import { useState, createContext} from "react";


const UpdateContext = createContext();

const UpdateProvider = ({children})=>{
    const [chanceData, setChanceData]= useState(false);
    const updateData = ()=>{
        setChanceData(!chanceData)
    }


    return (

        <UpdateContext.Provider value= {{updateData, chanceData}}>
            {children}
        </UpdateContext.Provider>
    )
    
}

export {UpdateContext, UpdateProvider}