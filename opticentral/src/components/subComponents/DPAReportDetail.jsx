import React from "react";

function DPAReportDetail({stopType,subStopType,specification, solution}) {
    

    return (

        <>       
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                Tipo de Parada: <span style={{ fontWeight: 'normal', color: 'inherit' }} className="pl-3">{stopType}</span>
            </p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                Sub Tipo: <span style={{ fontWeight: 'normal', color: 'inherit' }} className="pl-3">{subStopType}</span>
            </p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                Especificación: <span style={{ fontWeight: 'normal', color: 'inherit' }} className="pl-3">{specification}</span>
            </p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                Solución: <span style={{ fontWeight: 'normal', color: 'inherit' }} className="pl-2">{solution}</span>
            </p>
        </>
    )

};

export default DPAReportDetail