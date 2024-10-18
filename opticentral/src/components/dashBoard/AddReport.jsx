import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { ReportContext } from "../context/ReportContext";
import { getLocalStorage } from "../services/LocalStorage";
import { fetchUpdateReportProduction } from "../services/fetchData";
import { preDataReportItemProduction, validateDataWhithoutNull } from "../services/preData";
import { eventBasic, textUnderMessage, processingAction, closeSwal } from "../services/alerts";
import AddProduction from "./AddProduction";

import ParoExterno from "./ParoExterno";
import TurnoNoProgramado from "./TurnoNoProgramado";

function AddReport({ setActiveAddReport, setActivateDetailsProduction, setSelectedDate, selectedDate, setActivateAddIcon, data }) {
    const { dataReportProduction } = useContext(ReportContext)
    const [saveReport, setSaveReport] = useState(false);    
    const [dataFetch, setDataFetch] = useState({})   
    const [brand, setBrand] = useState(data.brand);


 

    useEffect(() => {


        // Validate user login token

        const authData = getLocalStorage('authData')
        // Validate the token and run the put fetch request

        if (!authData || !authData.auth && !authData.token) {
            console.log('sin token')

        } else if (!dataFetch || Object.keys(dataFetch).length === 0) {
            // Verificar si dataFetch está vacío
            console.log('Sin datos en dataFetch');
        } else {
            processingAction('Procesando Información', 'Por favor, espere ...')

            fetchUpdateReportProduction('http://localhost:3000/app/v1/updateData', data._id, authData.token, dataFetch)

                .then(result => {
                    closeSwal()
                    eventBasic('success', 'Reporte, ¡Guardado con exito!')
                    setActivateDetailsProduction(true);
                    setActivateAddIcon(true);
                    setActiveAddReport(false);
                    setSelectedDate(!selectedDate);
                })
                .catch(error =>
                    textUnderMessage('ERROR', `${error}, 1001`, 'error')

                )

        }
    }, [saveReport])




    const HandledClickDismiss = () => {
        setActivateDetailsProduction(true);
        setActivateAddIcon(true);
        setActiveAddReport(false);

    }
    const handledClickSaveReport = () => {


        const validateReport = validateDataWhithoutNull(dataReportProduction)
        if (validateReport) {
            textUnderMessage("¡Validar Información!", "Por favor, ingrese información válida y completa !", "warning")

        } else {

            console.log(data)
            setDataFetch(preDataReportItemProduction(data, dataReportProduction));
            setSaveReport(!saveReport);
            
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