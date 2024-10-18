import React from "react";
import { useState, useEffect, useContext } from "react";
import { ReportContext } from "../context/ReportContext";
import { calculateTimeDifference } from "../services/calculateTimeDifference";


function DPAReport() {

    const { dataReportProductionContext } = useContext(ReportContext);
    const [timeDifference, setTimeDifference] = useState(null);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [data, setData] = useState(false);
    const [dataTypeStop, setDataTypeStop] = useState('');
    const [dataSubTypeStop, setDataSubTypeStop] = useState('');
    const [dataModeFailure, setDataModeFailure] = useState('');
    const [dataSolution, setDataSolution] = useState('');
    const [optionSubType, setOptionSubType] = useState([]);
    const [specification, setSpecification] = useState([]);
    const [time, setTime] = useState(0);
    const [dataReport, setDataReport] = useState({
        startTime: null,
        endTime: null,
        totalTime: null,
        typeStop: null,
        subTypeStop: null,
        specification: null,
        solution: null,
        type:null



    });

    const optionSubTypeInput = {
        'Cambio de Marca': [
            'CIP Adicional',
            'Toma de muestra',
            'Analisis de parámetros'
        ],
        'Mantenimiento': [
            'Ventanas de Mtto',
            'Intervención Mtto interno',
            'Intervención Mtto Externo',
        ],
        'NONA': [
            'No Orden, No Actividad',
            'Limpieza',
            '5s',
            'Orden',
            'Reuniones Extras',


        ],
        'Paro Programado': [
            'Esterilizaciones',
            'Fin de Producción',
            'Ensayos',
            'Ventanas de MTTO',
            'Reuniones',
        ]


    }

    const optionSpecification = {
        'CIP Adicional': [
            'CIP 3 pasos',
            'CIP 5 pasos',

        ],
        'Toma de muestra': [
            'Analisis de Muestra',
            'Espera de resultados',
            'Repetir Muestra',

        ],
        'Analisis de parámetros': [
            'Fuera de Especificación',
            'Parámetros en Estudio',
            'Sin Parametros',
        ],
        'Ventanas de Mtto': [
            'Mtto programado'
        ],
        'Intervención Mtto interno': [
            'Mtto Interno de pruebas'

        ],
        'Intervención Mtto Externo': [
            'Mtto Externo de pruebas'

        ],
        'No Orden, No Actividad':[
            'NoNa'
        ],
        'Limpieza':[
            'LILA'
        ],
        '5s':[
            'Auditoria',
            'Orden'
        ],
        'Orden':[
            'Orden Y Aseo'

        ],
        'Reuniones Extras':[
            'Reuniones Extras'
        ],
        'Esterilizaciones':[
           'CIP 3 Pasos',
           'CIP 5 Pasos',
           'Esterilizaciones',
           'CIP Autoamtico',
           'CIP Vencido',
           'COP',
           'Fin de Producción'


        ],
        'Fin de Producción':[
            'Fin de Producción'
        ],
        'Ensayos':[
            'Nuevo Producto',
            'Cambio de Producto'       

        ],
        'Ventanas de MTTO':[
            'MTTO programado'

        ],
        'Reuniones':[
            'Reunion Programada'
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
            type:'DPA'
        }))
        setData(!data);

        if (optionSubTypeInput[value]){
            setOptionSubType(optionSubTypeInput[value])
        }else{
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

        if (optionSpecification[value]){
            setSpecification(optionSpecification[value])
        }else {
            setSpecification([])

        }
    }

    const handledChangeInputModeFailure = (e) => {
        const value = e.target.value;
        setDataModeFailure(value);
        setDataReport(prevState => ({
            ...prevState,
            specification: value
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
                                        <option>Cambio de Marca</option>
                                        <option>Mantenimiento</option>
                                        <option>NONA</option>
                                        <option>Paro Programado</option>
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
                                <label className="label custom-label">Especificación</label>
                                <div className="select is-small">
                                    <select className="is-hovered custom-width-add-report-averia " name="subSytem" id="subSystem" value={dataModeFailure} onChange={handledChangeInputModeFailure}>
                                        <option value='' > </option>
                                        {specification.map((option, index) => (
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
};


export default DPAReport