import React from "react";
import { useState, useEffect, useContext } from "react";
import { ReportContext } from "../context/ReportContext";
import { calculateTimeDifference } from "../services/calculateTimeDifference";




function AveriaReport() {
    const { dataReportProductionContext } = useContext(ReportContext);

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [timeDifference, setTimeDifference] = useState(null);
    const [dataSystem, setDataSystem] = useState('');
    const [dataSubSystem, setDataSubSystem] = useState('');
    const [dataComponent, setDataComponent] = useState('');
    const [dataModeFail, setDataModeFail] = useState('');
    const [dataSolution, setDataSolution] = useState('');
    const [data, setData] = useState(false);
    const [time, setTime] = useState(0);

    const [dataReport, setDataReport] = useState({
        startTime: null,
        endTime: null,
        totalTime: null,
        system: null,
        subSystem: null,
        component: null,
        failureMode: null,
        solution: null,

    });


    useEffect(() => {
        // The Effect of information management

        dataReportProductionContext(dataReport)

    }, [dataReport])

    useEffect(() => {
        setTime(timeDifference)


    }, [timeDifference])

    useEffect(() => {
        setDataReport(prevState => ({
            ...prevState,
            totalTime: time
        }))

    }, [time])

    // The const of the input

    const handledChangeInputStart = (e) => {
        const value = e.target.value;
        setStartTime(value);
        const totalTimeDifference = calculateTimeDifference(value, endTime);
        setTimeDifference(totalTimeDifference)
        setDataReport(prevState => ({
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
        setDataReport(prevState => ({
            ...prevState,
            endTime: value
        }))
        setData(!data);

    }

    const handledChangeInputSystem = (e) => {
        const value = e.target.value;
        setDataSystem(value);
        setDataReport(prevState => ({
            ...prevState,
            system: value
        }))
        setData(!data);

    }
    const handledChangeInputSubSystem = (e) => {
        const value = e.target.value;
        setDataSubSystem(value);
        setDataReport(prevState => ({
            ...prevState,
            subSystem: value
        }))
        setData(!data);

    }
    const handledChangeInputComponent = (e) => {
        const value = e.target.value;
        setDataComponent(value);
        setDataReport(prevState => ({
            ...prevState,
            component: value
        }))
        setData(!data);

    }
    const handledChangeInputModeFail = (e) => {
        const value = e.target.value;
        setDataModeFail(value);
        setDataReport(prevState => ({
            ...prevState,
            failureMode: value
        }))
        setData(!data);

    }
    const handledChangeInputSolution = (e) => {
        const value = e.target.value;
        setDataSolution(value);
        setDataReport(prevState => ({
            ...prevState,
            solution: value
        }))
        setData(!data);

    }


    return (
        <>
            <section className="columns is-centered">

                <label className="custom-label-total-report-averia">Tiempo Total de Avería: {timeDifference} h</label>


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

            <section className="columns is-centered">
                <div className="columns is-centered pt-3">
                    <div className="column">
                        <div className=" field is-horizontal">
                            <div className="field">
                                <label className="label custom-label">Sistema</label>
                                <div className="select is-small">
                                    <select className="is-hovered custom-width-add-report-averia " name="sistema" id="sistem" value={dataSystem} onChange={handledChangeInputSystem}>
                                        <option> </option>
                                        <option>Mecánico</option>
                                        <option>Eléctrico</option>
                                        <option>Automatización</option>
                                        <option>Proceso</option>
                                    </select>
                                </div>

                            </div>

                            <div className="field pl-2">
                                <label className="label custom-label">Sub sistema</label>
                                <div className="select is-small">
                                    <select className="is-hovered custom-width-add-report-averia " name="sistema" id="sistem" value={dataSubSystem} onChange={handledChangeInputSubSystem}>
                                    <option> </option>
                                        <option>Mecánico</option>
                                        <option>Eléctrico</option>
                                        <option>Automatización</option>
                                        <option>Proceso</option>
                                    </select>
                                </div>

                            </div>
                            <div className="field pl-2">
                                <label className="label custom-label">Componente</label>
                                <div className="select is-small">
                                    <select className="is-hovered custom-width-add-report-averia " name="sistema" id="sistem" value={dataComponent} onChange={handledChangeInputComponent}>
                                    <option> </option>
                                        <option>Mecánico</option>
                                        <option>Eléctrico</option>
                                        <option>Automatización</option>
                                        <option>Proceso</option>
                                    </select>
                                </div>

                            </div>
                            <div className="field pl-2">
                                <label className="label custom-label">Modo de fallo</label>
                                <div className="select is-small">
                                    <select className="is-hovered custom-width-add-report-averia " name="sistema" id="sistem" value={dataModeFail} onChange={handledChangeInputModeFail}>
                                    <option> </option>
                                        <option>Mecánico</option>
                                        <option>Eléctrico</option>
                                        <option>Automatización</option>
                                        <option>Proceso</option>
                                    </select>
                                </div>

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
                                    value={dataSolution}
                                    onChange={handledChangeInputSolution}
                                ></textarea>
                            </div>

                        </div>



                    </div>


                </div>


            </section>
        </>
    )
}

export default AveriaReport