import React from "react";
import { useState, useEffect, useContext } from "react";
import './index.css';
import { ReportContext } from "../context/ReportContext";
import { getLocalStorage } from "../services/LocalStorage";
import { fetchUpdateReportProduction } from "../services/fetchData";
import { validateDataWhithoutNull, preDataReportItemIc, preDataReportItemEc, preDataReportItemDPA, preDataReportItemNST} from "../services/preData";
import { eventBasic, textUnderMessage, processingAction, closeSwal } from "../services/alerts";
import ICReport from "./ICReport";
import ECReport from "./ECReport";
import DPAReport from "./DPAReport";
import NSTReport from "./NSTReport";

function AddReportExt({ setActivateDetailsProduction, setActivateReportExt, setSelectedDate, selectedDate, data }) {
    const { dataReportProduction } = useContext(ReportContext);
    const [activateICReport, setActivateICReport] = useState(false);
    const [activateECReport, setActivateECReport] = useState(false);
    const [activateDPAReport, setActivateDPAReport] = useState(false);
    const [activateNSTReport, setAcvateNSTReport] = useState(false);
    const [saveReport, setSaveReport] = useState(false)
    const [dataFetch, setDataFetch] = useState({})

    const [typeReport, setTypeReport] = useState(' ')



    useEffect(() => {
        // Validate user login token



        const authData = getLocalStorage('authData')
        // Validate the token and run the put fetch request

        if (!authData || !authData.auth && !authData.token) {
            console.log('sin token')

        } else if (!dataFetch || Object.keys(dataFetch).length === 0) {
            // Verificar si dataFetch está vacío
            return
        } else {
            processingAction('Procesando Información', 'Por favor, espere ...')

            console.log(data.id, dataFetch)

            fetchUpdateReportProduction('https://backendopticentral.onrender.com/app/v1/updateData', data.id, authData.token, dataFetch)
                .then(result => {
                    closeSwal()
                    eventBasic('success', 'Reporte, ¡Guardado con exito!')
                    setActivateDetailsProduction(true);
                    setActivateReportExt(false);
                    setSelectedDate(!selectedDate);
                })
                .catch((error) => {
                    textUnderMessage('ERROR', `${error}, 1002`, 'error'),
                        closeSwal()

                })



        }

    }, [saveReport])


    useEffect(() => {
        setActivateDetailsProduction(false);
    }, []);



    useEffect(() => {

        if (typeReport === 'IC') {

            setActivateICReport(true);
            setActivateECReport(false);
            setActivateDPAReport(false);
            setAcvateNSTReport(false);

        } else if (typeReport === 'EC') {

            setActivateECReport(true);
            setActivateICReport(false);
            setActivateDPAReport(false);
            setAcvateNSTReport(false);


        } else if (typeReport === 'DPA') {
            setActivateDPAReport(true);
            setActivateECReport(false);
            setActivateICReport(false);
            setAcvateNSTReport(false);


        } else if (typeReport === 'NST') {
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
        setActivateReportExt(false);
        setActivateDetailsProduction(true);

    };

    const handledClickReportSave = () => {
        const validateDataNull = validateDataWhithoutNull(dataReportProduction);


        if (validateDataNull) {
            textUnderMessage("¡Validar Información!", "Por favor, ingrese información válida y completa !", "warning")

        } else {

            if (typeReport === 'IC') {
                setDataFetch(preDataReportItemIc(data, dataReportProduction));
            } else if (typeReport === 'EC') {
                setDataFetch(preDataReportItemEc(data, dataReportProduction));
                console.log(data)
                console.log(dataFetch)
            } else if (typeReport === 'DPA') {
                setDataFetch(preDataReportItemDPA(data, dataReportProduction));
                console.log(data)
                console.log(dataFetch)
            }else if(typeReport === 'NST'){
                setDataFetch(preDataReportItemNST(data, dataReportProduction));
                console.log(data)
                console.log(dataFetch)

            }



            setSaveReport(!saveReport)
            


        };

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
                                            <option>IC</option>
                                            <option>EC</option>
                                            <option>DPA</option>
                                            <option>NST</option>
                                        </select>
                                    </div>

                                </div>


                            </div>


                        </div>

                        {activateICReport && <ICReport />}
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