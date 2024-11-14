import React from "react";

function NSTReportDetail({typeStop, subTypeStop}) {

    return (

        <>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                Tipo de Parada: <span style={{ fontWeight: 'normal', color: 'inherit' }} className="pl-3">{typeStop}</span>
            </p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                Sub Tipo: <span style={{ fontWeight: 'normal', color: 'inherit' }} className="pl-3">{subTypeStop}</span>
            </p>
            
          
        </>
    )

};

export default NSTReportDetail