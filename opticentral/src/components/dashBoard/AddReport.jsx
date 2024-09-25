import React from "react";
import { useState, useContext, useEffect } from "react";
import { ReportContext } from "../context/ReportContext";
import { getLocalStorage } from "../services/LocalStorage";
import { fetchUpdateReportProduction } from "../services/fetchData";
import { preDataReportItemProduction, validateDataWhithoutNull, preDataReportItemfault, preDataReportItemExternalStop, preDataReportItemUnscheduled } from "../services/preData";
import { eventBasic, textUnderMessage } from "../services/alerts";
import AddProduction from "./AddProduction";
import AveriaReport from "./AveriaReport";
import ParoExterno from "./ParoExterno";
import TurnoNoProgramado from "./TurnoNoProgramado";

function AddReport({ activeAddReport, setActiveAddReport, setActivateDetailsProduction, setSelectedDate, selectedDate, data }) {
    const { dataReportProduction } = useContext(ReportContext)
    const [typereport, setTypeReport] = useState();
    const [saveReport, setSaveReport] = useState(false);
    const [activeSetProductionReport, setActiveProductionReport] = useState(false);
    const [activeAveriaReport, setActiveAveriaReport] = useState(false);
    const [activeParoExterno, setActiveParoExterno] = useState(false);
    const [activeTurnoNoProgramado, setActiveTurnoNoProgramado] = useState(false);
    const [dataFetch, setDataFetch] = useState({})

    const [productionReport, setProductionReport] = useState(false);
    const [brand, setBrand] = useState(data.brand);






    useEffect(() => {

        // Effect active report production


        if (typereport === 'Producción') {
            setActiveTurnoNoProgramado(false);
            setActiveAveriaReport(false);
            setActiveParoExterno(false);
            setActiveAveriaReport(false);
            setActiveProductionReport(!activeSetProductionReport);
        }

        if (typereport === 'Avería') {
            setActiveTurnoNoProgramado(false);
            setActiveAveriaReport(false);
            setActiveProductionReport(false);
            setActiveParoExterno(false);
            setActiveAveriaReport(!activeAveriaReport);
        }

        if (typereport === 'Paro Externo') {
            setActiveTurnoNoProgramado(false);
            setActiveProductionReport(false);
            setActiveAveriaReport(false);
            setActiveParoExterno(!activeParoExterno);
        }
        if (typereport === 'Turno no Programado') {
            setActiveProductionReport(false);
            setActiveAveriaReport(false);
            setActiveParoExterno(false);
            setActiveTurnoNoProgramado(!activeTurnoNoProgramado);
        }





    }, [typereport])

    useEffect(() => {
        

        // Validate user login token

        const authData = getLocalStorage('authData')

        
        

        // Validate the token and run the put fetch request

        if (!authData || !authData.auth && !authData.token) {
            console.log('sin token')
            
        } else if (!dataFetch || Object.keys(dataFetch).length === 0) {
            // Verificar si dataFetch está vacío
            console.log('Sin datos en dataFetch');
        }else {
            
            
            fetchUpdateReportProduction('https://backendopticentral.onrender.com/app/v1/updateData', data._id, authData.token, dataFetch)
            
                .then(result => {
                    eventBasic('success', 'Reporte, ¡Guardado con exito!')
                    
                })
                .then(()=>{
                    setSelectedDate(!selectedDate)
                })
                .catch(error =>
                    textUnderMessage('ERROR', `${error}, 1001`, 'error')

                )

        }
    }, [saveReport])




    const HandledClickDismiss = () => {
        setActivateDetailsProduction(true)
        setActiveAddReport(false)
        
    }
    const handledClickSaveReport = () => {
         
        
        const validateReport = validateDataWhithoutNull(dataReportProduction)
        if (validateReport) {
            textUnderMessage("¡Validar Información!", "Por favor, ingrese información válida y completa !", "warning")

        } else {
            

            if (typereport === 'Producción') {              
                setDataFetch(preDataReportItemProduction(data, dataReportProduction));
                setSaveReport(!saveReport);
                
            }else if (typereport === 'Avería') {
                 setDataFetch(preDataReportItemfault(data, dataReportProduction));
                 setSaveReport(!saveReport);
             } else if (typereport === 'Paro Externo') {
                 setDataFetch(preDataReportItemExternalStop(data, dataReportProduction));
                 setSaveReport(!saveReport); 
             }else if (typereport ==='Turno no Programado'){
                
                setDataFetch(preDataReportItemUnscheduled(data,dataReportProduction));
                setSaveReport(!saveReport); 
               

             }
             
             
        }
    }

    const HandledChanceReport = (e) => {
        setTypeReport(e.target.value)
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

                    <div className="column is-flex is-justify-content-center">
                        <div className="field is-horizontal">

                            <div className="field ">
                                <label className="label custom-label">Reportar</label>
                                <div className="select is-small ">
                                    <select className="is-hovered custom-width-add-report " onChange={HandledChanceReport} value={typereport}>
                                        <option> </option>
                                        <option>Producción</option>
                                        <option>Avería</option>
                                        <option>Paro Externo</option>
                                        <option>Turno no Programado</option>
                                    </select>
                                </div>

                            </div>


                        </div>


                    </div>
                    {activeSetProductionReport && <AddProduction />}
                    {activeAveriaReport && <AveriaReport />}
                    {activeParoExterno && <ParoExterno />}
                    {activeTurnoNoProgramado && <TurnoNoProgramado />}




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