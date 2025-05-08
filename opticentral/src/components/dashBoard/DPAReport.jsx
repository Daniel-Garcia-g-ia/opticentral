import React from "react";
import { useState, useEffect, useContext } from "react";
import { ReportContext } from "../context/ReportContext";
import { DateContext } from "../context/DateContext";
import { calculateTimeDifference } from "../services/calculateTimeDifference";
import { validateTurn } from "../services/valideDataTurn";

function DPAReport({ values, typeReport }) {
    console.log(values)



    const { dataReportProductionContext } = useContext(ReportContext);
    const { turnSelected } = useContext(DateContext);
    const { equipmentId } = useContext(DateContext);
    const { equipmentName } = useContext(DateContext);
    const { location } = useContext(DateContext);
    const [timeDifference, setTimeDifference] = useState(null);
    const [startTime, setStartTime] = useState(values?.startTime || '');
    const [endTime, setEndTime] = useState(values?.endTime || '');
    const [dataTypeStop, setDataTypeStop] = useState(values?.typeReports || '');
    const [dataSubTypeStop, setDataSubTypeStop] = useState(values?.subTypeReport || '');
    const [dataSpecification, setdataSpecification] = useState(values?.specification || '');
    const [dataSolution, setDataSolution] = useState(values?.solution || '');
    const [data, setData] = useState(false);
    const [optionSubType, setOptionSubType] = useState([]);
    const [specification, setSpecification] = useState([]);
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
        specification: values?.specification || null,
        solution: values?.solution || null,
        typeReport: typeReport || null



    });

    const optionSubTypeInput = {

        'Cambio de Marca': [
            'Cambio de Marca',
            'CIP Adicional',
            'Toma de muestra',
            'Analisis de parámetros'
        ],
        'Inicio de Producción': [
            'Inicio de Producción'

        ],
        'Fin de Producción': [
            'Fin de Producción'
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
            'Paro Programado',
            'Esterilizaciones',
            'Fin de Producción',
            'Ensayos',
            'Ventanas de MTTO',
            'Reuniones',
        ]


    }

    const optionSpecification = {
        'Paro Programado': [
            'Heineken',
            'Levadura No Disponible'
        ],
        'Cambio de Marca': [
            'Heineken'
        ],
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
        'No Orden, No Actividad': [
            'NoNa'
        ],
        'Limpieza': [
            'LILA'
        ],
        '5s': [
            'Auditoria',
            'Orden'
        ],
        'Orden': [
            'Orden Y Aseo'

        ],
        'Reuniones Extras': [
            'Reuniones Extras'
        ],
        'Esterilizaciones': [
            'CIP 3 Pasos',
            'CIP 5 Pasos',
            'Esterilizaciones',
            'CIP Autoamtico',
            'CIP Vencido',
            'COP',
            'Fin de Producción'


        ],
        'Fin de Producción': [
            'Fin de Producción'
        ],
        'Inicio de Producción': [
            'Inicio de Producción',
            'Molienda'
        ],
        'Ensayos': [
            'Nuevo Producto',
            'Cambio de Producto'

        ],
        'Ventanas de MTTO': [
            'MTTO programado'

        ],
        'Reuniones': [
            'Reunion Programada'
        ]



    }

    useEffect(() => {
        if (typeReport === 'DPA') {
            

            setOptionSubType(optionSubTypeInput[dataTypeStop]);
            setSpecification(optionSpecification[dataSubTypeStop]);
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
            typeReport: 'DPA'
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

        if (optionSpecification[value]) {
            setSpecification(optionSpecification[value])
        } else {
            setSpecification([])

        }
    }

    const handledChangeInputModeFailure = (e) => {
        const value = e.target.value;
        setdataSpecification(value);
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
                <label className="custom-label-total-report-DPA">Tiempo Total de Avería: {timeDifference} h</label>

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
                                        <option>Cambio de Marca</option>
                                        <option>Inicio de Producción</option>
                                        <option>Fin de Producción</option>
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
                                    <select className="is-hovered custom-width-add-report-averia " name="subSytem" id="subSystem" value={dataSpecification} onChange={handledChangeInputModeFailure}>
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