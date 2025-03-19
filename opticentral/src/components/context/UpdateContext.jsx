import React from "react";
import { useState, createContext } from "react";


const UpdateContext = createContext();

const UpdateProvider = ({ children }) => {
    const [chanceData, setChanceData] = useState(false);
    const [chanceDataGannt, setChanceDataGannt] = useState(false)
    const updateData = () => {
        setChanceData(!chanceData)

    }
    const updateDataGannt = () => {
        setChanceDataGannt(!chanceDataGannt)
    }


    return (

        <UpdateContext.Provider value={{ updateData, chanceData, updateDataGannt, chanceDataGannt }}>
            {children}
        </UpdateContext.Provider>
    )

}

export { UpdateContext, UpdateProvider }