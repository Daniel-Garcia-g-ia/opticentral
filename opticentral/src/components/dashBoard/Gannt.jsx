import React from "react";
import { useState, useEffect } from "react";
import ReportDetail from "./ReportDetail";


function Gannt({ data }) {

    const { inicio, fin, name, tiempoTotal, bg } = data
    const [activeTilte, setActiveTitle] = useState(true);
    const [activeDetail, setActiveDetail] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    //calulate hours for the time
    // 75 vh height gannt X total time report / 8 working hours
   
    useEffect(() => {
        if (tiempoTotal <= 0.3) {
            setActiveTitle(false)
        }


    }, [tiempoTotal])
  

    const handledHover = () => {
        setActiveDetail(true);
    }

    const handledOut = () => {
        setActiveDetail(false);
    }
    const handleMouseMove = (e) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY,
        });
    };



    const heightBar = (75 * data.tiempoTotal) / 8



    return (
        <>
            <div className="is-custom-gannt-bar">
                <div className="custom-gannt-bar is-flex is-align-items-center is-justify-content-center"
                    style={{
                        height: `${heightBar}vh`,
                        width: '100%',
                        background: data.bg
                    }}
                    onMouseEnter={handledHover}
                    onMouseLeave={handledOut}
                    onMouseMove={handleMouseMove}

                >
                    <div>
                        {activeTilte && <span className="custom-title-gannt-bar">{data.name}</span>}
                    </div>



                </div>

                <div>
                    {activeDetail && <ReportDetail data={data} setActiveDetail={setActiveDetail} />}
                </div>


            </div>


        </>

    )

}

export default Gannt;