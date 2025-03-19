import React from "react";
import { useState, useEffect, useContext } from "react";
import { preDataUpdateReport } from "../services/preData";
import { fetchUpdateReportProduction } from "../services/fetchData";
import { ReportContext } from "../context/ReportContext";
import { UpdateContext } from "../context/UpdateContext";
import { getLocalStorage } from "../services/LocalStorage";
import { DateContext } from "../context/DateContext";
import { eventBasic, textUnderMessage, processingAction, closeSwal } from "../services/alerts";
import config from "../../../config";
import ICReport from "../dashBoard/ICReport";
import ECReport from "../dashBoard/ECReport";
import DPAReport from "../dashBoard/DPAReport";
import NSTReport from "../dashBoard/NSTReport";
import { dataBrands } from "../../assets/data/data";
import AddProduction from "../dashBoard/AddProduction";




function EditReport({ data, setActiveDetail }) {
    const { updateData } = useContext(UpdateContext)
    const { updateDataGannt } = useContext(UpdateContext);
     const { dataReportProductionContext } = useContext(ReportContext);
    const { dataReportProduction } = useContext(ReportContext);
    const { dateSelected } = useContext(DateContext);
    const { turnSelected } = useContext(DateContext);
    const { valueTimeContext } = useContext(DateContext);

    const [closeModal, setCloseModal] = useState(false);
    const [activeICReport, setActiveICReport] = useState(false);
    const [activeECReport, setActiveECReport] = useState(false);
    const [activeDPAReport, setActiveDPAReport] = useState(false);
    const [activeNSTReport, setActiveNSTReport] = useState(false);
    const [activeProductionReport, setActiveProductionReport] = useState(false);
    const [releaseTime, setReleaseTime] = useState(false);
    const [validateRelease, setValidateRelease] = useState(false);

    const [values, setValues] = useState();
    const [typeReport, setTypeReport] = useState();
    const [updateReport, setUpdateReport] = useState(false);
    const [dataFetch, setDataFetch] = useState({})



    useEffect(() => {

        const authData = getLocalStorage('authData')
        if (!authData || !authData.auth && !authData.token) {
            eventBasic('warning', 'sin token')
        } else if (!dataFetch || Object.keys(dataFetch).length === 0) {
            // Verificar si dataFetch está vacío           
            return
        } else {
            processingAction('Procesando Información', 'Por favor, espere ...')
            fetchUpdateReportProduction(`${config.apiUrl}/app/v1/updateData/report`, data.idReport[0], authData.token, dataFetch)
                .then(result => {
                    closeSwal();
                    updateData();
                    updateDataGannt();


                }).then(result => {
                    eventBasic('success', 'Reporte, ¡Guardado con exito!')
                })
                .catch((error) => {
                    textUnderMessage('ERROR', `${error}, 1002`, 'error'),
                        closeSwal();

                })

        }



    }, [updateReport])




    useEffect(() => {
        if (data.type === 'IC') {
            setTypeReport(data.type)
            setActiveICReport(true);
            setValues(data.data.report)

        } else if (data.type === 'EC') {
            setTypeReport(data.type);
            setActiveECReport(true);
            setValues(data.data.report);

        } else if (data.type === 'DPA') {
            setTypeReport(data.type);
            setActiveDPAReport(true);
            setValues(data.data.report);

        }
        else if (data.type === 'NST') {
            setTypeReport(data.type);
            setActiveNSTReport(true);
            setValues(data.data.report);
        } else {
            setTypeReport(data.type);
            setActiveProductionReport(true);
            setValues(data.data.report);


        }
    }, [])

    const handleClickClose = () => {
        setCloseModal(true);
        setActiveDetail(false);
    }

    const handledClickSave = () => {

        setDataFetch(preDataUpdateReport(dataReportProduction, data, dateSelected, turnSelected));
        setReleaseTime(true);
        setUpdateReport(!updateReport)
       

    }


    return (
        <>
            <div id='modal' className={`modal ${!closeModal ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-card" style={{ width: 'auto', maxWidth: '90%', margin: 'auto' }}>
                    <header className="modal-card-head">
                        <p className="modal-card-title">Modificar reporte</p>
                        <button className="delete" aria-label="close" onClick={handleClickClose}></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="p-5">
                            {activeICReport && <ICReport values={values} typeReport={typeReport} />}
                            {activeECReport && <ECReport values={values} typeReport={typeReport} />}
                            {activeDPAReport && <DPAReport values={values} typeReport={typeReport} />}
                            {activeNSTReport && <NSTReport values={values} typeReport={typeReport} />}
                            {activeProductionReport && <AddProduction values={values} typeReport={typeReport} />}
                        </div>

                    </section>
                    <footer className="modal-card-foot">
                        <div className="buttons">
                            <button className="button is-success" onClick={handledClickSave}>Guardar Cambios</button>
                            <button className="button" onClick={handleClickClose}>Cancelar</button>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )

}

export default EditReport