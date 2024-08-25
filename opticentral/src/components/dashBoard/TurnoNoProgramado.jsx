import React from "react";
import { useState,useEffect, useContext } from "react";
import { ReportContext } from "../context/ReportContext";
import { calculateTimeDifference } from "../services/calculateTimeDifference";

function TurnoNoProgramado() {

    const {dataReportProductionContext}= useContext(ReportContext);

    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [timeDifference, setTimeDifference] = useState(null);
    const [data, setData]=useState(false);
    const [time, setTime]=useState(0);
    const [dataReport, setDataReport]= useState({
        startTime: null,
        endTime: null,
        totalTime: null
    })

     useEffect(()=>{
         dataReportProductionContext(dataReport)
     },[dataReport])

     useEffect(() => {
        setTime(timeDifference)


    }, [timeDifference])

     useEffect(()=>{
        setDataReport(prevState=>({
            ...prevState,
            totalTime: time
        }))

     },[time])



    const handledChangeInputStart = (e) => {
        const value = e.target.value;
        setStartTime(value);
        const totalTimeDifference = calculateTimeDifference(value, endTime);
        setTimeDifference(totalTimeDifference)
        setDataReport(prevState=>({
            ...prevState,
            startTime: value
        }))
        setData(!data);

    }

    const handledChangeInputEnd = (e) => {
        const value = e.target.value;
        setEndTime(value);
        const totalTimeDifference = calculateTimeDifference(startTime, value);
        setTimeDifference(totalTimeDifference);
        setDataReport(prevState=>({
            ...prevState,
            endTime: value
        }))
        setData(!data);

    }




    return (
        <>

            <section className="columns is-centered">

                <label className="custom-label-total-report-noProgram">Tiempo Total Reporte {timeDifference} h</label>


                <div className="columns is-centered has-text-centered">
                    <div className="column">
                        <div className="field is-horizontal pt-5">

                            <div className="field">
                                <label className="label custom-label">Inicio</label>
                                <div className="control">
                                    <input className="input is-small" type="time" value={startTime} onChange={handledChangeInputStart} />
                                </div>
                            </div>

                            <div className="field pl-3">
                                <label className="label custom-label">Fin</label>
                                <div className="control">
                                    <input className="input is-small" type="time" value={endTime} onChange={handledChangeInputEnd} />
                                </div>
                            </div>

                        </div>

                    </div>


                </div>



            </section>

        </>
    )
}

export default TurnoNoProgramado;