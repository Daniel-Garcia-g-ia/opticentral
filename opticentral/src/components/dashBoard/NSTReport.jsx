import React from "react";
import { useState, useEffect, useContext } from "react";
import { ReportContext } from "../context/ReportContext";
import { calculateTimeDifference } from "../services/calculateTimeDifference";


function NSTReport() {

    const { dataReportProductionContext } = useContext(ReportContext);
    const [timeDifference, setTimeDifference] = useState(null);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [data, setData] = useState(false);
    const [dataTypeStop, setDataTypeStop] = useState('');
    const [dataSubTypeStop, setDataSubTypeStop] = useState('');
    const [dataSolution, setDataSolution] = useState('');
    const [optionSubType, setOptionSubType] = useState([]);
    const [time, setTime] = useState(0);
    const [dataReport, setDataReport] = useState({
        startTime: null,
        endTime: null,
        totalTime: null,
        typeStop: null,
        subTypeStop: null,
        solution: null,
        type:null

    });

    const optionSubTypeInput = {
        'Turno No Programado': [
            'Turno No Programado'

        ],
        'Intervención de Ingeniería': [
            'Intervención de Ingeniería'

        ]


    }

    useEffect(() => {
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

    const handledChangeInputTypeStop = (e) => {
        const value = e.target.value;
        setDataTypeStop(value);
        setDataReport(prevState => ({
            ...prevState,
            typeStop: value,
            type:'NST'
        }))
        setData(!data);
        if(optionSubTypeInput[value]){
            setOptionSubType(optionSubTypeInput[value]);
        }else{
            setOptionSubType([]);

        }


    }
    const handledChangeInputSubType = (e) => {
        const value = e.target.value;
        setDataSubTypeStop(value);
        setDataReport(prevState => ({
            ...prevState,
            subTypeStop: value
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
            <section className="columns is-centered" >
                <label className="custom-label-total-report-averia">Tiempo Total de Avería: {timeDifference} h</label>

                <div className="columns is-centered has-text-centered">
                    <div className="column">
                        <div className="field is-horizontal pt-1">

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
                <div className="columns is-centered pt-1">
                    <div className="column">
                        <div className=" field is-horizontal">
                            <div className="field">
                                <label className="label custom-label">Tipo de Parada</label>
                                <div className="select is-small">
                                    <select className="is-hovered custom-width-add-report-averia " name="sistema" id="sistem" value={dataTypeStop} onChange={handledChangeInputTypeStop}>
                                        <option> </option>
                                        <option>Turno No Programado</option>
                                        <option>Intervención de Ingeniería</option>
                                    </select>
                                </div>

                            </div>

                            <div className="field pl-2">
                                <label className="label custom-label">Sub Tipo</label>
                                <div className="select is-small">
                                    <select className="is-hovered custom-width-add-report-averia " name="subSytem" id="subSystem" value={dataSubTypeStop} onChange={handledChangeInputSubType}>
                                        <option value='' > </option>
                                        {optionSubType.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>




                        </div>
                    </div>

                </div>

            </section>

            <section className="columns is-centered">
                <div className="columns is-centered pt-2">
                    <div className="column">
                        <div className="fieid">
                            <label className="label custom-label">Observación</label>
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
};

export default NSTReport