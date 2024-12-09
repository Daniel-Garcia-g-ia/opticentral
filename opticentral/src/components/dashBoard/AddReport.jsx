import React from "react";
import config from "../../../config";
import { useState, useContext, useEffect, useRef } from "react";
import { ReportContext } from "../context/ReportContext";
import { DateContext } from "../context/DateContext";
import { UpdateContext } from "../context/UpdateContext";
import { getLocalStorage } from "../services/LocalStorage";
import { fetchUpdateReportProduction } from "../services/fetchData";
import { preDataReportItemProduction, validateDataWhithoutNull } from "../services/preData";
import { eventBasic, textUnderMessage, processingAction, closeSwal } from "../services/alerts";

import AddProduction from "./AddProduction";

import ParoExterno from "./ParoExterno";
import TurnoNoProgramado from "./TurnoNoProgramado";

function AddReport({ setActiveAddReport, setActivateDetailsProduction, setSelectedDate, selectedDate, setActivateAddIcon, data }) {
    const { dateSelected } = useContext(DateContext);
    const { turnSelected } = useContext(DateContext);
    const { valueTimeContext } = useContext(DateContext);
    const { dataReportProduction } = useContext(ReportContext);
    const { dataReportProductionContext } = useContext(ReportContext);
    const { updateData } = useContext(UpdateContext);
    const [saveReport, setSaveReport] = useState(false);
    const [dataFetch, setDataFetch] = useState({})
    const [brand, setBrand] = useState(data.brand);
    const [releaseAddReport, setReleaseAddReport] = useState(false);
    const [validateRelease, setValidateRelease] = useState(false);




    useEffect(() => {


        // Validate user login token

        const authData = getLocalStorage('authData')
        // Validate the token and run the put fetch request

        if (!authData || !authData.auth && !authData.token) {
            eventBasic('warning', 'sin token')
           

        } else if (!dataFetch || Object.keys(dataFetch).length === 0) {
            // Verificar si dataFetch está vacío
            eventBasic('warning', 'sin datos')
        } else {
            processingAction('Procesando Información', 'Por favor, espere ...')



            fetchUpdateReportProduction(`${config.apiUrl}/app/v1/updateData`, data._id, authData.token, dataFetch)

                .then(result => {
                    
                    closeSwal()
                    eventBasic('success', 'Reporte, ¡Guardado con exito!')                    
                    setActivateAddIcon(true);
                    setActiveAddReport(false);
                    setSelectedDate(!selectedDate);
                   
                }).then(result=>{
                    updateData();
                })              
                .catch(error =>
                    textUnderMessage('ERROR', `${error}, 1001`, 'error')

                )

        }
    }, [saveReport])

    useEffect(() => {
        if (releaseAddReport) {

            const sumaTotalTime = Number(valueTimeContext) + Number(dataFetch.totalTime)
            console.lgo(sumaTotalTime)
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




    const HandledClickDismiss = () => {
        setActivateDetailsProduction(true);

        setActivateAddIcon(true);
        setActiveAddReport(false);

    }
    const handledClickSaveReport = () => {

        if (valueTimeContext <= 8) {
            const validateReport = validateDataWhithoutNull(dataReportProduction)

            if (validateReport) {
                textUnderMessage("¡Validar Información!", "Por favor, ingrese información válida y completa !", "warning")

            } else {


                setDataFetch(preDataReportItemProduction(data, dataReportProduction, dateSelected, turnSelected));





            }
            setReleaseAddReport(true);
            setValidateRelease(!validateRelease);

        } else {
            textUnderMessage("¡Validar Información!", "Tiempo superado del turno !", "warning")
        }




    }


    return (
        <>

            <section className=" custom-section-add-report columns is-centered has-text-centered">

                <div className=" custom-brand-add-report is-flex pt-5 is-justify-content-start ">
                    <p className="">
                        <span className="brand-title title is-6 is-custom-brand-add-report" >{brand}</span>
                    </p>


                </div>

                <div className="column custom-addreport ">


                    <AddProduction />




                    <div className="column is-flex is-justify-content-center">
                        <div className="field is-grouped">
                            <div className="control ">
                                <button className="button is-link" onClick={handledClickSaveReport}>Guardar</button>
                            </div>
                            <div className="control ">
                                <button className="button is-link is-light" onClick={HandledClickDismiss}>Descartar</button>
                            </div>
                        </div>


                    </div>




                </div>



            </section>




        </>
    )
}




export default AddReport;