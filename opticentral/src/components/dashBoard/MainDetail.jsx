import React from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { fetchDeleteReport } from "../services/fetchData";
import { getLocalStorage } from "../services/LocalStorage";
import { eventBasic, textUnderMessage, processingAction, closeSwal, confirmAcction } from "../services/alerts";
import { RiDeleteRow } from "react-icons/ri";
import { UpdateContext } from "../context/UpdateContext";
import { useState, useEffect, useContext } from "react";

import config from "../../../config";

function MainDetail({ _id, production, processDataId, productionId, reportId, brand, volume, brewId, handledClickAdd }) {

    const { chanceData } = useContext(UpdateContext);
     const { updateData } = useContext(UpdateContext);

    const [registerProduction, setRegisterProduction] = useState(false);
    const [deleteReport, setDeleteReport] = useState(false);

    useEffect(() => {



        production.forEach(item => {
            if (item.productionReportItem.length > 0) {
                setRegisterProduction(true)

            } else {
                setRegisterProduction(false);
            }
        })

    }, [production])

    const handledClick = () => {
        handledClickAdd({ brand, _id, processDataId, productionId, reportId })

    }

    const handledClickDelete = (reportId) => {

        confirmAcction('¿Estás seguro?', 'Esta acción no se puede deshacer', 'warning', 'Sí, eliminar', 'Eliminado', 'El registro ha sido eliminado')
            .then((result) => {
                if (result) {

                    const authData = getLocalStorage('authData')
                    if (!authData || !authData.auth && !authData.token) {
                        eventBasic('warning', 'sin token')

                    } else {

                       
                        fetchDeleteReport(`${config.apiUrl}/app/v1/delete/main-report/${reportId}`, authData.token, processDataId, productionId)
                            .then(result => {
                                closeSwal();
                                eventBasic('success', 'Reporte, ¡Eliminado con exito!')
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
            });



    }



    return (


        <>

            <div className="box-custom pt-1"
                style={{
                    borderBottom: registerProduction ? 'solid 3px #8CCC85' : 'solid 1px #5d5f6448',

                }}

            >


                <p className="is-flex is-justify-content-end ">
                    <span className="brand-title title is-6 is-custom-brand-add-report" onClick={handledClick}>{brand}</span>

                </p>





                <div className="field pt-1 is-horizontal">
                    <div className="field pl-3">
                        <span>Brew ID </span>
                        <div className="field ">
                            <p className="control">
                                <input className="input is-small is-success is-custom-wifth-amount-hl" type="number" name="brewId" value={brewId} disabled />
                            </p>
                        </div>
                    </div>
                    <div className="field pl-5 ">
                        <label className="">Cantidad Total</label>
                        <div className="field  has-addons">
                            <p className="control">
                                <input className="input is-small is-success is-custom-wifth-amount-hl" type="number" defaultValue={volume} disabled />
                            </p>
                            <p className="control">
                                <a className="button is-static is-small">
                                    Hl
                                </a>
                            </p>
                        </div>

                    </div>
                    <div className="field pl-5">
                        <label className="">Tiempo Total</label>
                        <div className="control is-custom-small">
                            <input className="input is-small" type="text" placeholder=" " disabled />
                        </div>
                    </div>
                    <div className="field pl-5">
                        <label className=""> Eficiencía  </label>
                        <div className="control is-custom-small">
                            <input className="input is-small" type="text" placeholder=" " disabled />
                        </div>
                    </div>
                    <div className="is-flex is-justify-content-end is-align-items-flex-end is-custom-button-aux">
                        <RiDeleteRow className='is-custom-delete' size={24} onClick={() => handledClickDelete(_id)} />


                    </div>


                </div>

            </div>



        </>
    )
}

export default MainDetail;