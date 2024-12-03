import React, { useState, useEffect } from "react";
import ReportDetail from "./ReportDetail";

function Gannt({ data }) {   

   
    const totalTime = data?.totalTime || data?.data?.item?.totalTime || 0;
    const { startTime, endTime, name, bg } = data;    
    const [activeTitle, setActiveTitle] = useState(true);    
    const [activeDetail, setActiveDetail] = useState(false);    
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });   
    const heightBar = (75 * totalTime) / 8;
        
    useEffect(() => {
        
        if (totalTime <= 0.3) {
            setActiveTitle(false);
        }
    }, [totalTime]);

    // Funciones de manejo de hover
    const handledHover = () => {
        setActiveDetail(true);
    };

    const handledOut = () => {
        setActiveDetail(false);
    };

    const handleMouseMove = (e) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY,
        });
    };

    return (
        <>
            <div className="is-custom-gannt-bar">
                <div
                    className="custom-gannt-bar is-flex is-align-items-center is-justify-content-center"
                    style={{
                        height: `${heightBar}vh`,  // Aplicar la altura calculada
                        width: "100%",
                        background: bg || "#ccc",  // Usar el fondo del reporte o un valor por defecto
                    }}
                    onMouseEnter={handledHover}
                    onMouseLeave={handledOut}
                    onMouseMove={handleMouseMove}
                >
                    {/* Mostrar el título si está activo */}
                    <div>
                        {activeTitle && <span className="custom-title-gannt-bar">{name}</span>}
                    </div>
                </div>

                {/* Mostrar el detalle del reporte si está activo */}
                <div>
                    {activeDetail && (
                        <ReportDetail
                            data={data}
                            setActiveDetail={setActiveDetail}
                            mousePosition={mousePosition}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default Gannt;
