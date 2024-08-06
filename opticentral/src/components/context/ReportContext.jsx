import React from "react";

import { useState, createContext } from "react";


const ReportContext = createContext();


const ReportProvider = ({ children }) => {

    const [dataReportProduction, setDataReportProduction] = useState([null]);
    
    const dataReportProductionContext = (data) => {
        setDataReportProduction(data);
        
    }

   
    return (
        <ReportContext.Provider value={{
           dataReportProductionContext, dataReportProduction

        }}>
            {children}
        </ReportContext.Provider>
    )
}

export { ReportContext, ReportProvider }