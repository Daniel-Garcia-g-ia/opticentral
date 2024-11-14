import React from "react";

function ECReportDetail({ stopType, subStopType, failureMode, solution }) {


    return (
        <>
        
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                Tipo de Parada: <span style={{ fontWeight: 'normal', color: 'inherit' }} className="pl-3">{stopType}</span>
            </p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                Sub Tipo: <span style={{ fontWeight: 'normal', color: 'inherit' }} className="pl-3">{subStopType}</span>
            </p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                Modo de Falla: <span style={{ fontWeight: 'normal', color: 'inherit' }} className="pl-3">{failureMode}</span>
            </p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                Solución: <span style={{ fontWeight: 'normal', color: 'inherit' }} className="pl-2">{solution}</span>
            </p>

        </>
    )
};

export default ECReportDetail