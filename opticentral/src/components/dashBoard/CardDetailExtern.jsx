import React from "react";
import { useState, useEffect } from "react";
import { LiaEditSolid } from "react-icons/lia";
import ICReportDetail from "../subComponents/ICReportDetail";
import ECReportDetail from "../subComponents/ECReportDetail";
import DPAReportDetail from "../subComponents/DPAReportDetail";
import NSTReportDetail from "../subComponents/NSTReportDetail";

function CardDetailExtern({ data, handledHover, handledOut, activateEditModal, handleClickEdit }) {
   
    const [ICReport, setICReport] = useState(false);
    const [ECReport, setECReport] = useState(false);
    const [DPAReport, setDPAReport] = useState(false);
    const [NSTReport, setNSTReport] = useState(false);

    const { startTime, endTime, totalTime, machine, component, subSystem, failureMode } = data.data.report
    const { subTypeStop, typeStop, solution } = data.data.report
    const { specification } = data.data.report
    const { type, name, bg } = data


    useEffect(() => {
        if (type === 'IC') {
            setICReport(true)
        } else if (type === 'EC') {
            setECReport(true)
        } else if (type === 'DPA') {
           
            setDPAReport(true)
        } else if (type === 'NST') {
            setNSTReport(true)
        }


    }, [])

    return (

        <>
            <div className="card is-custom-card-model-detail"
                onMouseEnter={handledHover}
                onMouseLeave={!activateEditModal ? handledOut : undefined}
            >

                <header className="is-flex is-justify-content-space-between pl-5 pr-5 pt-3 pb-3">
                    <div className="is-flex-direction-column">
                        <p className="">Inicio: <span className="pl-3">{startTime}</span>  </p>
                        <p>Fin: <span className="pl-3">{endTime}</span>   </p>

                    </div>
                    <div className="">
                        <span>Total: {totalTime} h</span>

                    </div>


                </header>

                <div className="is-custom-separator ml-5 mr-5" >
                </div>
                <div className=" is-flex is-justify-content-end pr-5">
                    <p className="subtitle" style={{ color: `${bg}` }}>{name}</p>
                </div>


                <div className="card-content ">
                    {/* <p className="">Reporte: <span className="pl-3">{ }</span>  </p> */}
                    {ICReport && <ICReportDetail
                        machine={machine}
                        subSystem={subSystem}
                        component={component}
                        failureMode={failureMode}
                    />}

                    {ECReport && <ECReportDetail
                        stopType={typeStop}
                        subStopType={subTypeStop}
                        failureMode={failureMode}
                        solution={solution}

                    />}
                    {DPAReport && <DPAReportDetail
                        stopType={typeStop}
                        subStopType={subTypeStop}
                        specification={specification}
                        solution={solution}

                    />}
                    {NSTReport && <NSTReportDetail
                        typeStop={typeStop}
                        subTypeStop={subTypeStop}
                        

                    />}

                    


                </div>
                <div className="is-custom-edit">
                    <span onClick={handleClickEdit}><LiaEditSolid size={34} /></span>

                </div>



            </div>

        </>

    )
}

export default CardDetailExtern