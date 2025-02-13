import React from "react";
import { useState, useEffect, useContext } from "react";
import { ReportContext } from "../context/ReportContext";
import { DateContext } from "../context/DateContext";
import { calculateTimeDifference } from "../services/calculateTimeDifference";
import { validateTurn } from "../services/valideDataTurn";


function NSTReport({ values, typeReport }) {

    const { dataReportProductionContext } = useContext(ReportContext);
    const { turnSelected } = useContext(DateContext);
    const { equipmentId } = useContext(DateContext);
    const { equipmentName } = useContext(DateContext);
    const { location } = useContext(DateContext);
    const [timeDifference, setTimeDifference] = useState(null);
    const [startTime, setStartTime] = useState(values?.startTime || '');
    const [endTime, setEndTime] = useState(values?.endTime || '');
    const [dataTypeStop, setDataTypeStop] = useState(values?.typeStop || '');
    const [dataSubTypeStop, setDataSubTypeStop] = useState(values?.subTypeStop || '');
    const [dataSolution, setDataSolution] = useState(values?.solution || '');
    const [data, setData] = useState(false);
    const [optionSubType, setOptionSubType] = useState([]);
    const [time, setTime] = useState(0);
    const [min, setMin] = useState();
    const [max, setMax] = useState();
    const [dataReport, setDataReport] = useState({
        equipmentId: equipmentId || null,
        equipmentName: equipmentName || null,
        location: location || null,
        startTime: values?.startTime || null,
        endTime: values?.endTime || null,
        totalTime: values?.totalTime || null,
        typeStop: values?.typeStop || null,
        subTypeStop: values?.subTypeStop || null,
        solution: values?.solution || null,
        typeReport: typeReport || null

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
        if (typeReport === 'NST') {

            setOptionSubType(optionSubTypeInput[dataTypeStop]);
            setTimeDifference(values.totalTime)
            dataReportProductionContext(dataReport)
        }
        const valueTime = validateTurn(turnSelected);
        setMin(valueTime.min)
        setMax(valueTime.max)

    }, [])

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
            setStartTime(0)
        }

    }

    const handledChangeInputEnd = (e) => {
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
            setEndTime(0)
        }
    };



    const handledChangeInputTypeStop = (e) => {
        const value = e.target.value;
        setDataTypeStop(value);
        setDataReport(prevState => ({
            ...prevState,
            typeStop: value,
            typeReport: 'NST'
        }))
        setData(!data);
        if (optionSubTypeInput[value]) {
            setOptionSubType(optionSubTypeInput[value]);
        } else {
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
                <label className="custom-label-total-report-noProgram">Tiempo Total de Avería: {timeDifference} h</label>

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