import React from "react";

function ICReportDetail({ machine, subSystem, component, failureMode }) {

    return (
        <>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                Máquina: <span style={{ fontWeight: 'normal', color: 'inherit' }} className="pl-3">{machine}</span>
            </p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                Falla: <span style={{ fontWeight: 'normal', color: 'inherit' }} className="pl-3">{subSystem}</span>
            </p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                Componente: <span style={{ fontWeight: 'normal', color: 'inherit' }} className="pl-3">{component}</span>
            </p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                Modo de falla: <span style={{ fontWeight: 'normal', color: 'inherit' }} className="pl-2">{failureMode}</span>
            </p>

        </>
    )
};

export default ICReportDetail