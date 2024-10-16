import React from "react";
import { useState, useEffect,useContext } from "react";
import { ReportContext } from "../context/ReportContext";
import { calculateTimeDifference } from "../services/calculateTimeDifference";


function ECReport() {
    const { dataReportProductionContext } = useContext(ReportContext);
    const [timeDifference, setTimeDifference] = useState(null);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [dataTypeStop, setDataTypeStop] = useState('');
    const [data, setData] = useState(false);
    const [dataSubTypeStop, setDataSubTypeStop] = useState('');
    const [dataModeFailure, setDataModeFailure] = useState('');
    const [dataSolution, setDataSolution] = useState('');
    const [optionSubType, setOptionSubType] = useState([]);
    const [optionFailureMode, setOptionFailureMode] = useState([]);
    const [time, setTime] = useState(0);
    const [dataReport, setDataReport] = useState({
        startTime: null,
        endTime: null,
        totalTime: null,
        typeStop: null,
        subTypeStop: null,
        failureMode: null,
        solution: null,
        type:null

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
            'Materia Prima Malta',
            'Materia Prima Arroz',
            'HMS',
            'Dextrosa',
            'Insumos',
            'Silica Gel',
            'PVPP'
        ],
        'Logistica Externa': [
            'Materia Prima Malta',
            'Materia Prima Arroz',
            'HMS',
            'Dextrosa',
            'Insumos',
            'Silica Gel',
            'PVPP'
        ],
        'Muestras de Calidad': [
            'Muestras BBT',
            'Muestra TFM',
            'Muestra PVPP',
            'Muestra DAW',
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
            'CIP',
            'Cocecha Levadura',
            'Mantenimiento'
        ],
        'Materia Prima Malta': [
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
        'Muestras BBT': [
            'PH',
            'Oxígeno',
            'TPO',
            'Espuma',
            'Extracto',
            'Color',
            'Sensorial',

        ],
        'Muestra TFM': [
            'PH',
            'Oxígeno',
            'TPO',
            'Espuma',
            'Extracto',
            'Color',
            'Sensorial',

        ],
        'Muestra PVPP': [
            'PH',
            'Oxígeno',
            'TPO',
            'Espuma',
            'Extracto',
            'Color',
            'Sensorial',

        ],
        'Muestra DAW': [
            'PH',
            'Oxígeno',
            'TPO',
            'Espuma',
            'Extracto',
            'Color',
            'Sensorial',

        ],
        'Falta de CO2':[
            'Corte de Energía',
            'Falla en el Sitema',
            'No disponible',
            'Sin Inventario',
            'Intervención'

        ],

        'Falta de Agua Sobrecalentada':[
            'Corte de Energía',
            'Falla en el Sitema',
            'No disponible',
            'Sin Inventario',
            'Intervención'

        ],
        'Falta de Aire Comprimido':[
            'Corte de Energía',
            'Falla en el Sitema',
            'No disponible',
            'Sin Inventario',
            'Intervención'

        ],
        'Falta de Agua':[
            'Corte de Energía',
            'Falla en el Sitema',
            'No disponible',
            'Sin Inventario',
            'Intervención'

        ],
        'Falta de Energía Eléctrica':[
            'Corte de Energía',
            'Falla en el Sitema',
            'Falla de Transferencia',
            'Falla UPS',
            'Intervención'

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
            type:'EC'
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