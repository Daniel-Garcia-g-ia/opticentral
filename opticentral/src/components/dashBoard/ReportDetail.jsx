import React from "react";
import { useState, useEffect, useContext } from "react";
import { LiaEditSolid } from "react-icons/lia";
import EditReport from "../modal/EditReport";
import CardDetailProduction from "./CardDetailProduction";
import CardDetailExtern from "./CardDetailExtern";
import { UpdateContext } from "../context/UpdateContext";
import { getLocalStorage } from "../services/LocalStorage";
import { fetchDeleteReportOne, fetchDeleteReportExternal } from "../services/fetchData";
import { eventBasic, textUnderMessage, processingAction, closeSwal, confirmAcction } from "../services/alerts";

import { TbRuler } from "react-icons/tb";
import { SiNamemc } from "react-icons/si";

import config from "../../../config";

function ReportDetail({ data, setActiveDetail }) {

    const { updateDataGannt } = useContext(UpdateContext);
    const { updateData } = useContext(UpdateContext);

    const [activateEditModal, setActivateEditModal] = useState(false);
    const [activeExternal, setActiveExternal] = useState(false);
    const [activeProduction, setActiveProduction] = useState(false);
    const [dataReportExtern, setDataReportExtern] = useState({});


    useEffect(() => {

        if (data.type === 'IC' || data.type === 'EC' || data.type === 'DPA' || data.type === 'NST') {
            setActiveExternal(true)
            setDataReportExtern(data)

        }
        else if (data.type === 'EBT') {
            setActiveProduction(true);
        }

    }, [])


    const handledHover = () => {
        setActiveDetail(true)
    }

    const handledOut = () => {
        setActiveDetail(false)
    }

    const handleClickEdit = () => {
        setActivateEditModal(true)

    }
    const handleClickDelete = () => {

        confirmAcction('¿Estás seguro?', 'Esta acción no se puede deshacer', 'warning', 'Sí, eliminar', 'Eliminado', 'El registro ha sido eliminado')
            .then((result) => {
                if (result) {

                    const documentId = data.idReport[0];
                    const processDataId = data.idReport[1];
                    const productionId = data.idReport[2];
                    const reportId = data.idReport[4]
                    const authData = getLocalStorage('authData')
                    if (!authData || !authData.auth && !authData.token) {
                        eventBasic('warning', 'sin token')
                    } else {


                        fetchDeleteReportOne(`${config.apiUrl}/app/v1/delete/report-production/${documentId}`, authData.token, processDataId, productionId, reportId)
                            .then(result => {
                                closeSwal();
                                updateDataGannt();
                                updateData();


                            })
                            .catch(error => {
                                closeSwal();
                                textUnderMessage('ERROR', `${error}, 1001`, 'error')
                            }


                            )

                    }

                } else {
                    // Cancelado
                    console.log('Acción cancelada');
                }


            }
            )
    }

    const handleClickDeleteExternal = () => {
        confirmAcction('¿Estás seguro?', 'Esta acción no se puede deshacer', 'warning', 'Sí, eliminar', 'Eliminado', 'El registro ha sido eliminado')
            .then((result) => {
                if (result) {                    
                    const documentId = data.idReport[0]
                    const reportId = data.idReport[1]
                    const typeReport = data.type
                    const authData = getLocalStorage('authData')
                    if (!authData || !authData.auth && !authData.token) {
                        eventBasic('warning', 'sin token')
                    } else {
                        fetchDeleteReportExternal(`${config.apiUrl}/app/v1/delete/report-external/${documentId}`, authData.token, typeReport, reportId)
                            .then(result => {
                                closeSwal();
                                updateDataGannt();
                                updateData();

                            }).catch(error => {
                                closeSwal();
                                textUnderMessage('ERROR', `${error}, 1001`, 'error')
                            })
                    }


                } else {
                    console.log('rechazado')
                }

            })
    }



    return (
        <>
            {activeProduction &&
                <CardDetailProduction data={data} handledHover={handledHover}
                    handledOut={handledOut} setActiveDetail={setActiveDetail}
                    activateEditModal={activateEditModal} handleClickEdit={handleClickEdit}
                    handleClickDelete={handleClickDelete}
                />}

            {activeExternal &&
                <CardDetailExtern data={data} handledHover={handledHover}
                    handledOut={handledOut} setActiveDetail={setActiveDetail}
                    activateEditModal={activateEditModal} handleClickEdit={handleClickEdit}
                    handleClickDeleteExternal={handleClickDeleteExternal}

                />}


            {activateEditModal && <EditReport data={data} setActiveDetail={setActiveDetail} />}


        </>
    )


}


export default ReportDetail