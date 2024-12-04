import React from "react";
import { useState, useEffect, useContext } from "react";
import { ReportContext } from "../context/ReportContext";
import { DateContext } from "../context/DateContext";
import { calculateTimeDifference } from "../services/calculateTimeDifference";
import { validateTurn } from "../services/valideDataTurn";
function AddProduction({ values, typeReport }) {

    const { dataReportProductionContext } = useContext(ReportContext);
    const { turnSelected } = useContext(DateContext);
    const [startTime, setStartTime] = useState(values?.startTime || 0);
    const [endTime, setEndTime] = useState(values?.endTime || 0);
    const [volume, setVolume] = useState(values?.volume || '');
    const [timeDifference, setTimeDifference] = useState(values?.totalTime || null);
    const [time, setTime] = useState(0);
    const [min, setMin] = useState();
    const [max, setMax] = useState();
    const [dataReport, setDataReport] = useState({
        startTime: values?.startTime || null,
        endTime: values?.endTime || null,
        totalTime: values?.totalTime || null,
        volume: values?.volume || null
    })

    useEffect(() => {        

        const valueTime = validateTurn(turnSelected);
        setMin(valueTime.min)
        setMax(valueTime.max)

    }, [])

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

        // Obtener los valores de min y max para el turno actual
        const { min, max, min1, max1, min2, max2 } = validateTurn(turnSelected);

        // Verificar si el valor está dentro del rango, incluyendo el caso especial para Turno 3
        if ((min && max && value >= min && value <= max) ||
            (min1 && max1 && min2 && max2 && ((value >= min1 && value <= max1) || (value >= min2 && value <= max2)))) {

            setStartTime(value);

            // Calcular la diferencia de tiempo si el valor es válido
            const totalTimeDifference = calculateTimeDifference(value, endTime);
            setTimeDifference(totalTimeDifference);

            // Actualizar el estado de `dataReport`
            setDataReport(prevState => ({
                ...prevState,
                startTime: value
            }));

            // Cambiar el estado de `data`
            setData(!data);
        } else {
            alert(`El horario debe estar entre ${min || `${min1} - ${max1} y ${min2} - ${max2}`}.`);
        }


    }

    const handledEndTimeChange = (e) => {
        const value = e.target.value;

        // Obtener los valores de min y max para el turno actual
        const { min, max, min1, max1, min2, max2 } = validateTurn(turnSelected);

        // Verificar si el valor está dentro del rango, incluyendo el caso especial para Turno 3
        if ((min && max && value >= min && value <= max) ||
            (min1 && max1 && min2 && max2 && ((value >= min1 && value <= max1) || (value >= min2 && value <= max2)))) {

            setEndTime(value);

            // Calcular la diferencia de tiempo si el valor es válido
            const totalTimeDifference = calculateTimeDifference(startTime, value);
            setTimeDifference(totalTimeDifference);

            // Actualizar el estado de `dataReport`
            setDataReport(prevState => ({
                ...prevState,
                endTime: value
            }));

            // Cambiar el estado de `data`
            setData(!data);
        } else {
            alert(`El horario debe estar entre ${min || `${min1} - ${max1} y ${min2} - ${max2}`}.`);
        }
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

                            <div className="field" lang="en-GB">
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
