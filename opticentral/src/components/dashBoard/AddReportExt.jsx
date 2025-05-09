import React from "react";
import config from "../../../config";
import { useState, useEffect, useContext } from "react";
import './index.css';
import { ReportContext } from "../context/ReportContext";
import { UpdateContext } from "../context/UpdateContext";
import { DateContext } from "../context/DateContext";
import { getLocalStorage } from "../services/LocalStorage";
import { fetchUpdateReportProduction, fetchSetOpiReport } from "../services/fetchData";
import { validateDataWhithoutNull, preDataReportItemIc, preDataReportItemEc, preDataReportItemDPA, preDataReportItemNST, preDataSetReportOpi } from "../services/preData";
import { eventBasic, textUnderMessage, processingAction, closeSwal } from "../services/alerts";
import ICReport from "./ICReport";
import ECReport from "./ECReport";
import DPAReport from "./DPAReport";
import NSTReport from "./NSTReport";

function AddReportExt({ setActivateDetailsProduction, setActivateReportExt, setSelectedDate, selectedDate, data }) {

    const { dataReportProduction } = useContext(ReportContext);
    const { dataReportProductionContext } = useContext(ReportContext);
    const { valueTimeContext } = useContext(DateContext);
    const { dateSelected } = useContext(DateContext);
    const { turnSelected } = useContext(DateContext);
    const { updateData } = useContext(UpdateContext);
    const { updateDataGannt } = useContext(UpdateContext);
    const [activateICReport, setActivateICReport] = useState(false);
    const [activateECReport, setActivateECReport] = useState(false);
    const [activateDPAReport, setActivateDPAReport] = useState(false);
    const [activateNSTReport, setAcvateNSTReport] = useState(false);
    const [saveReport, setSaveReport] = useState(false);
    const [dataFetch, setDataFetch] = useState({});
    const [releaseAddReport, setReleaseAddReport] = useState(false);
    const [validateRelease, setValidateRelease] = useState(false);
    const [updateDataEffect, setUpdateDataEffect] = useState(false);

    const [typeReport, setTypeReport] = useState(' ')



    useEffect(() => {
        // Validate user login token
        const authData = getLocalStorage('authData')
        // Validate the token and run the put fetch request

        if (!authData || !authData.auth && !authData.token) {
            eventBasic('warning', 'sin token')

        } else if (!dataFetch || Object.keys(dataFetch).length === 0) {
            // Verificar si dataFetch está vacío
            return
        } else {
            processingAction('Procesando Información', 'Por favor, espere ...')
            console.log(dataFetch)


            fetchSetOpiReport(`${config.apiUrl}/app/v1/opi-report`, authData.token, dataFetch)
                .then(result => {
                    console.log(result)
                    eventBasic('success', 'Reporte, ¡Guardado con exito!')
                    closeSwal();                    
                    updateDataGannt()                   
                    setActivateReportExt(false);
                    setActivateDetailsProduction(true);


                })               
                .catch((error) => {
                    textUnderMessage('ERROR', `${error}, 1002`, 'error')
                    /*  closeSwal() */

                })
        }

    }, [saveReport])

  


    useEffect(() => {
        setActivateDetailsProduction(false);


    }, []);
    useEffect(() => {
        if (releaseAddReport) {

            const sumaTotalTime = Number(valueTimeContext) + Number(dataFetch.totalTime)

      
            if (sumaTotalTime <= 8) {
                setSaveReport(!saveReport)

            } else {
                setReleaseAddReport(false);
                dataReportProductionContext({ data: null });
                textUnderMessage("¡Validar Información!", "Tiempo superado del turno !", "warning")

            }

        } else {
            return
        }



    }, [validateRelease]);



    useEffect(() => {

        if (typeReport === 'Causa Interna (IC)') {

            setActivateICReport(true);
            setActivateECReport(false);
            setActivateDPAReport(false);
            setAcvateNSTReport(false);

        } else if (typeReport === 'Causa Externa (EC)') {

            setActivateECReport(true);
            setActivateICReport(false);
            setActivateDPAReport(false);
            setAcvateNSTReport(false);


        } else if (typeReport === 'Actividad Planeada (DPA)') {
            setActivateDPAReport(true);
            setActivateECReport(false);
            setActivateICReport(false);
            setAcvateNSTReport(false);


        } else if (typeReport === 'No Programado (NST)') {
            setAcvateNSTReport(true);
            setActivateDPAReport(false);
            setActivateECReport(false);
            setActivateICReport(false);

        }



    }, [typeReport]);


    const handledChance = (e) => {
        setTypeReport(e.target.value);


    };

    const handledClickDismiss = () => {
        dataReportProductionContext({ data: null });
        setActivateReportExt(false);
        setActivateDetailsProduction(true);



    };

    const handledClickReportSave = () => {

        if (valueTimeContext <= 8) {
            const validateDataNull = validateDataWhithoutNull(dataReportProduction);

            if (validateDataNull) {
                textUnderMessage("¡Validar Información!", "Por favor, ingrese información válida y completa !", "warning")

            } else {
                if (typeReport === 'Causa Interna (IC)') {
                    console.log('aqui')

                    setDataFetch(preDataSetReportOpi(dataReportProduction, dateSelected, turnSelected));

                } else if (typeReport === 'Causa Externa (EC)') {
                    setDataFetch(preDataSetReportOpi(dataReportProduction, dateSelected, turnSelected));
                    console.log('aqui')

                } else if (typeReport === 'Actividad Planeada (DPA)') {
                    setDataFetch(preDataSetReportOpi(dataReportProduction, dateSelected, turnSelected));
                    console.log('aqui')

                } else if (typeReport === 'No Programado (NST)') {
                    setDataFetch(preDataSetReportOpi(dataReportProduction, dateSelected, turnSelected));
                    console.log('aqui')
                }

                setReleaseAddReport(true);
                setValidateRelease(!validateRelease);
            };

        } else {

            textUnderMessage("¡Validar Información!", "Tiempo superado del turno !", "warning")
        }


    }




    return (
        <>
            <section className=" custom-section-add-report columns is-centered has-text-centered">

                <div className=" custom-brand-add-report is-flex pt-5 is-justify-content-start ">
                    <p className="">
                        <span className="brand-title title is-6 is-custom-brand-add-report" > Nuevo Reporte </span>
                    </p>


                </div>

                <div className="column custom-addreport ">

                    <div className="column is-flex is-justify-content-center">
                        <div className="field is-horizontal">

                            <div className="field ">
                                <label className="label custom-label">Reporte</label>
                                <div className="select is-small ">
                                    <select className="is-hovered custom-width-add-report " onChange={handledChance} value={typeReport} >
                                        <option> </option>
                                        <option>Causa Interna (IC)</option>
                                        <option>Causa Externa (EC)</option>
                                        <option>Actividad Planeada (DPA)</option>
                                        <option>No Programado (NST)</option>
                                    </select>
                                </div>

                            </div>


                        </div>


                    </div>

                    {activateICReport && <ICReport values={''} typeReport={''} />}
                    {activateECReport && <ECReport />}
                    {activateDPAReport && <DPAReport />}
                    {activateNSTReport && <NSTReport />}






                    <div className="column is-flex is-justify-content-center">
                        <div className="field is-grouped">
                            <div className="control ">
                                <button className="button is-link" onClick={handledClickReportSave}>Guardar</button>
                            </div>
                            <div className="control ">
                                <button className="button is-link is-light" onClick={handledClickDismiss} >Descartar</button>
                            </div>
                        </div>


                    </div>




                </div>



            </section>
        </>
    )
}


export default AddReportExt