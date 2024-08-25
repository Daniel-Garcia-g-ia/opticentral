import React from "react";
import { useEffect, useState, useContext } from "react";
import { ReportContext } from "../context/ReportContext";
import { calculateTimeDifference } from "../services/calculateTimeDifference"
import { TbNumber0Small } from "react-icons/tb";

function ParoExterno() {


    const { dataReportProductionContext } = useContext(ReportContext);

    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [dataTypeStop, setDataTypeStop] = useState('');
    const [dataDetailStop, setDataDetailStop] = useState('');
    const [dataDescription, setDataDescription] = useState(' ');
    const [dataAction, setDataAction] = useState('');
    const [data, setData] = useState(false);
    const [differenceTime, setDifferenceTime] = useState(null);
    const [time, setTime] = useState(0);

    const [dataReport, setDataReport] = useState({
        startTime: null,
        endTime: null,
        totalTime: null,
        typeStop: null,
        detailStop: null,
        descriptionStop: null,
        solution: null

    })

    useEffect(() => {

        dataReportProductionContext(dataReport);



    }, [dataReport])
    useEffect(() => {
        setTime(differenceTime)


    }, [differenceTime])

    useEffect(()=>{
        setDataReport(prevState=>({
            ...prevState,
            totalTime: time
        }))

     },[time])

    

   
    const handledChangeInputStart = (e) => {
        const value = e.target.value;
        setStartTime(value);
        const differenceTime = calculateTimeDifference(value, endTime);
        setDifferenceTime(differenceTime);
        setDataReport(prevState => ({
            ...prevState,
            startTime: value
        }))
        setData(!data);


    }
    const handledChangeInputEnd = (e) => {
        const value = e.target.value;
        setEndTime(value);
        const differenceTime = calculateTimeDifference(startTime, value);
        setDifferenceTime(differenceTime);
        setDataReport(prevState => ({
            ...prevState,
            endTime: value
        }))
        setData(!data);

    }


    const handledTypeStopReport = (e) => {
        const value = e.target.value;
        setDataTypeStop(value);
        setDataReport(prevState => ({
            ...prevState,
            typeStop: value
        }))
        setData(!data);

    }
    const handledDetailStopReport = (e) => {
        const value = e.target.value;
        setDataDetailStop(value);
        setDataReport(prevState => ({
            ...prevState,
            detailStop: value
        }))
        setData(!data);


    }
    const handledDescriptionStopReport = (e) => {
        const value = e.target.value;
        setDataDescription(value);
        setDataReport(prevState => ({
            ...prevState,
            descriptionStop: value
        }))
        setData(!data);


    }
    const handledActionStopReport = (e) => {
        const value = e.target.value;
        setDataAction(value);
        setDataReport(prevState => ({
            ...prevState,
            solution: value
        }))
        setData(!data);

    }







    return (
        <>
            <section className="columns is-centered">
                <label className="custom-label-total-report-stop">Tiempo Total de Reporte: {differenceTime} h</label>
                <div className="columns is-centered">
                    <div className="column">
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

                    </div>


                </div>


            </section>

            <section className="columns is-centered">

                <div className="columns is-centered">
                    <div className="column">
                        <div className="field is-horizontal">
                            <div className="field">
                                <label className="label custom-label">Tipo de Paro</label>
                                <div className="select is-small">
                                    <select className="is-hovered custom-width-add-report-averia " name="sistema" id="sistem" value={dataTypeStop} onChange={handledTypeStopReport}>
                                        <option> </option>
                                        <option>Servicios Industriales</option>
                                        <option>Avería de Maquina</option>
                                        <option>Mantenimiento</option>
                                        <option>Disponibilidad del Proceso</option>
                                    </select>
                                </div>

                            </div>
                            <div className="field pl-3">
                                <label className="label custom-label">Detalle del Paro</label>
                                <div className="select is-small">
                                    <select className="is-hovered custom-width-add-report-averia " name="sistema" id="sistem" value={dataDetailStop} onChange={handledDetailStopReport}>
                                        <option> </option>
                                        <option>Corte de Energía Eléctrica</option>
                                        <option>Falta de suministro de Agua</option>
                                        <option>Aire Comprimido</option>
                                        <option>Agua Sobre Calentada</option>
                                    </select>
                                </div>

                            </div>
                            <div className="field pl-3">
                                <label className="label custom-label">Descripción del Paro</label>
                                <p className="control">
                                    <input className="input is-small" type="text" value={dataDescription} onChange={handledDescriptionStopReport} />

                                </p>

                            </div>




                        </div>

                    </div>

                </div>



            </section>

            <section className="columns is-centered">
                <div className="columns is-centered">
                    <div className="column">
                        <div className="fieid">
                            <label className="label custom-label">Solución</label>
                            <div className="text-area-width">
                                <textarea
                                    className="textarea is-info is-small"
                                    placeholder="ingrese texto"
                                    value={dataAction}
                                    onChange={handledActionStopReport}
                                ></textarea>
                            </div>

                        </div>



                    </div>


                </div>


            </section>
        </>


    )
}

export default ParoExterno;