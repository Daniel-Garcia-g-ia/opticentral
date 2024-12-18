import React from "react";
import { useState, useEffect, useContext } from "react";
import { ReportContext } from "../context/ReportContext";
import { DateContext } from "../context/DateContext";
import { calculateTimeDifference } from "../services/calculateTimeDifference";
import { validateTurn } from "../services/valideDataTurn";

function ECReport({ values, typeReport }) {

    const { dataReportProductionContext } = useContext(ReportContext);
    const { turnSelected } = useContext(DateContext);
    const [timeDifference, setTimeDifference] = useState(null);
    const [startTime, setStartTime] = useState(values?.startTime || '');
    const [endTime, setEndTime] = useState(values?.endTime || '');
    const [dataTypeStop, setDataTypeStop] = useState(values?.typeStop || '');
    const [dataSubTypeStop, setDataSubTypeStop] = useState(values?.subTypeStop || '');
    const [dataModeFailure, setDataModeFailure] = useState(values?.failureMode || '');
    const [dataSolution, setDataSolution] = useState(values?.solution || '');
    const [data, setData] = useState(false);
    const [optionSubType, setOptionSubType] = useState([]);
    const [optionFailureMode, setOptionFailureMode] = useState([]);
    const [time, setTime] = useState(0);
    const [min, setMin] = useState();
    const [max, setMax] = useState();
    const [dataReport, setDataReport] = useState({
        startTime: values?.startTime || null,
        endTime: values?.endTime || null,
        totalTime: values?.totalTime || null,
        typeStop: values?.typeStop || null,
        subTypeStop: values?.subTypeStop || null,
        failureMode: values?.failureMode || null,
        solution: values?.solution || null,
        type: typeReport || null

    });


    const optionSubTypeInput = {
        'Falla de Comunicación': [
            'Falla en el sistema de comunicación',
            'Comunicación BBT a Envasado',

        ],
        'Falta de TFM': [
            'Disponibilidad de Tanques',
            'Cellar Ocupado'
        ],
        'Logistica Interna': [
            'Levadura',
            'Materia Prima Malta',
            'Materia Prima Arroz',
            'HMS',
            'Dextrosa',
            'Insumos',
            'Silica Gel',
            'PVPP'
        ],
        'Logistica Externa': [
            'Levadura',
            'Materia Prima Malta',
            'Materia Prima Arroz',
            'HMS',
            'Dextrosa',
            'Insumos',
            'Silica Gel',
            'PVPP'
        ],
        'Muestras de Calidad': [

            'Muestra Sacarificación',
            'Muestra TFM'
            
        ],
            'Servicios Industriales': [
            'Falta de CO2',
            'Falta de Agua Sobrecalentada',
            'Falta de Aire Comprimido',
            'Falta de Agua',
            'Falta de Energía Eléctrica'
        ]

    }

    const optionModeFailure = {
        'Falla en el sistema de comunicación': [
            'Caida de Energía',
            'Falla en Botec',
            'UPS en falla',
        ],
        'Comunicación BBT a Envasado': [
            'Caida de Energía',
            'Falla en Botec',
            'UPS en falla',
        ],
        'Disponibilidad de Tanques': [
            'Tanques llenos',
            'Tanque en MTTO',
            'Disponibilidad'
        ],
        'Cellar Ocupado': [
            'Filtración',
            'CIP',
            'Cocecha Levadura',
            'Mantenimiento'
        ],
        'Levadura':[
            'Levadura No Disponible',            

        ],
        'Materia Prima Malta': [
            'Calidad de Malta',
            'Compactada',            
            'Liberación',
            'Disponibilidad',
            'Sin Inventario'
        ],
        'Materia Prima Arroz': [
            'Liberación',
            'Disponibilidad',
            'Sin Inventario'
        ],
        'HMS': [
            'Liberación',
            'Disponibilidad',
            'Sin Inventario'

        ],
        'Dextrosa': [
            'Liberación',
            'Disponibilidad',
            'Sin Inventario'
        ],
        'Insumos': [
            'Liberación',
            'Disponibilidad',
            'Sin Inventario'
        ],
        'Silica Gel': [
            'Liberación',
            'Disponibilidad',
            'Sin Inventario'
        ],
        'PVPP': [
            'Liberación',
            'Disponibilidad',
            'Sin Inventario'
        ],
            'Muestra TFM': [
            'PH',
            'Oxígeno',
            'TPO',
            'Espuma',
            'Extracto',
            'Color',
            'Sensorial'
        ],
        'Muestra Sacarificación':[
            'tiempo de sacarificación',
            'Extracto'
        ],         
        'Falta de CO2': [
            'Corte de Energía',
            'Falla en el Sitema',
            'No disponible',
            'Sin Inventario',
            'Intervención'

        ],

        'Falta de Agua Sobrecalentada': [
            'Corte de Energía',
            'Falla en el Sitema',
            'No disponible',
            'Sin Inventario',
            'Intervención'

        ],
        'Falta de Aire Comprimido': [
            'Corte de Energía',
            'Falla en el Sitema',
            'No disponible',
            'Sin Inventario',
            'Intervención'

        ],
        'Falta de Agua': [
            'Corte de Energía',
            'Falla en el Sitema',
            'No disponible',
            'Sin Inventario',
            'Intervención'

        ],
        'Falta de Energía Eléctrica': [
            'Corte de Energía',
            'Falla en el Sitema',
            'Falla de Transferencia',
            'Falla UPS',
            'Intervención'

        ]

    }

    useEffect(() => {
        if (typeReport === 'EC') {

            setOptionSubType(optionSubTypeInput[dataTypeStop]);
            setOptionFailureMode(optionModeFailure[dataSubTypeStop]);
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

    }


    const handledChangeInputTypeStop = (e) => {
        const value = e.target.value;
        setDataTypeStop(value);
        setDataReport(prevState => ({
            ...prevState,
            typeStop: value,
            type: 'EC'
        }))
        setData(!data);
        if (optionSubTypeInput[value]) {
            setOptionSubType(optionSubTypeInput[value])
        } else {
            setOptionSubType([])
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

        if (optionModeFailure[value]) {
            setOptionFailureMode(optionModeFailure[value])
        } else {
            setOptionFailureMode([])
        }


    }

    const handledChangeInputModeFailure = (e) => {
        const value = e.target.value;
        setDataModeFailure(value);
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

            <section className="columns is-centered" >
                <label className="custom-label-total-report-stop">Tiempo Total de Avería: {timeDifference} h</label>

                <div className="columns is-centered has-text-centered">
                    <div className="column">
                        <div className="field is-horizontal pt-1">

                            <div className="field">
                                <label className="label custom-label">Inicio</label>
                                <div className="control">
                                    <input className="input is-small" type="time" value={startTime} onChange={handledChangeInputStart} step='60' min={min} max={max} />
                                </div>
                            </div>

                            <div className="field pl-3">
                                <label className="label custom-label">Fin</label>
                                <div className="control">
                                    <input className="input is-small" type="time" value={endTime} onChange={handledChangeInputEnd} step='60' min={min} max={max} />
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
                                        <option>Falla de Comunicación</option>
                                        <option>Falta de TFM</option>
                                        <option>Logistica Interna</option>
                                        <option>Logistica Externa</option>
                                        <option>Muestras de Calidad</option>
                                        <option>Servicios Industriales</option>
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
                            <div className="field pl-2">
                                <label className="label custom-label">Modo de Fallo</label>
                                <div className="select is-small">
                                    <select className="is-hovered custom-width-add-report-averia " name="subSytem" id="subSystem" value={dataModeFailure} onChange={handledChangeInputModeFailure}>
                                        <option value='' > </option>
                                        {optionFailureMode.map((option, index) => (
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

export default ECReport