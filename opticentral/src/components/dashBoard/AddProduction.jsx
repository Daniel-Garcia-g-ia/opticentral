import React from "react";
import { useState, useEffect, useContext } from "react";
import { ReportContext } from "../context/ReportContext";
import { calculateTimeDifference } from "../services/calculateTimeDifference";

function AddProduction({ values, typeReport }) {

    const { dataReportProductionContext } = useContext(ReportContext);
    const [startTime, setStartTime] = useState(values?.startTime || 0);
    const [endTime, setEndTime] = useState(values?.endTime || 0);
    const [volume, setVolume] = useState(values?.volume || '');
    const [timeDifference, setTimeDifference] = useState(values?.totalTime || null);
    const [time, setTime] = useState(0);
    const [dataReport, setDataReport] = useState({
        startTime: values?.startTime || null,
        endTime: values?.endTime || null,
        totalTime: values?.totalTime || null,
        volume: values?.volume || null
    })

    useEffect(() => {
        setTime(timeDifference)


    }, [timeDifference])

    useEffect(() => {
        setDataReport(prevState => ({
            ...prevState,
            totalTime: time
        }))

    }, [time])

    useEffect(() => {
        dataReportProductionContext(dataReport)

    }, [dataReport])





    const handledStartTimeChange = (e) => {
        const value = e.target.value;
        setStartTime(value);
        const differenceTime = calculateTimeDifference(value, endTime);
        setTimeDifference(differenceTime);
        setDataReport(prevState => ({
            ...prevState,
            startTime: value

        }))


    }

    const handledEndTimeChange = (e) => {
        const value = e.target.value;
        setEndTime(value);
        const differenceTime = calculateTimeDifference(startTime, value);
        setTimeDifference(differenceTime);
        setDataReport(prevState => ({
            ...prevState,
            endTime: value

        }))
    }

    const handledVolumeChange = (e) => {
        const value = e.target.value;
        setVolume(value)
        setDataReport(prevState => ({
            ...prevState,
            volume: value

        }))

    }





    return (
        <>

            <section className="columns is-centered">
                <label className="custom-label-total-report">Tiempo Total de Reporte: {timeDifference} h</label>



                <div className="columns is-centered has-text-centered is-custom-add-production-report">


                    <div className="column">



                        <div className="field is-horizontal pt-5">

                            <div className="field">
                                <label className="label custom-label">Inicio</label>
                                <div className="control">
                                    <input className="input is-small" type="time" value={startTime} onChange={handledStartTimeChange} step='60' min="00:00" max='23:59' />
                                </div>
                            </div>

                            <div className="field pl-3">
                                <label className="label custom-label">Fin</label>
                                <div className="control">
                                    <input className="input is-small" type="time" value={endTime} onChange={handledEndTimeChange} step='60' min="00:00" max='23:59' />
                                </div>
                            </div>

                            <div className="field pl-5 ">
                                <label className="label custom-label">Volumen</label>
                                <div className="field   has-addons">
                                    <p className="control">
                                        <input className="input is-small is-success is-custom-wifth-amount-hl" type="number" value={volume} onChange={handledVolumeChange} />
                                    </p>
                                    <p className="control">
                                        <a className="button is-static is-small">
                                            Hl
                                        </a>
                                    </p>
                                </div>

                            </div>






                        </div>



                    </div>


                </div>

            </section>

        </>
    )
}

export default AddProduction;
