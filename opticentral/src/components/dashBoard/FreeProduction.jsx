import React from "react";
import config from "../../../config";
import { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { NavbarContext } from "../context/NavbarContext";
import { DateContext } from "../context/DateContext";
import { findMaxBrewId } from "../services/preData";
import { basicMessage, eventBasic, processingAction, closeSwal, textUnderMessage } from "../services/alerts";
import { dataBrands } from "../../assets/data/data";
import { getLocalStorage } from "../services/LocalStorage";
import { fetchData, fetchSetReport } from "../services/fetchData";
import InputsFreeProduction from "./InputsFreeProduction";
import { dataNewReport, preDatafreeProduction, validateDataWhithoutNull } from "../services/preData";

function FreeProduction({ equipmentId, equipmentName, location, activateFreeProduction, setActivateFreeProduction }) {



    const { discardProduction } = useContext(NavbarContext)

    const { dateSelected } = useContext(DateContext)
    const { turnSelected } = useContext(DateContext)

    const [brewId, setBrewId] = useState(0);
    const [inputValues, setInputValues] = useState({})
    const [redirect, setRedirect] = useState(false);
    const [saveData, setSaveData] = useState(false)

    const navigate = useNavigate()

    const [amountProductions, setAmountProductions] = useState(0);

    useEffect(() => {

        const authData = getLocalStorage('authData')
        if (!authData || !authData.auth && !authData.token) {
            navigate('/');

        } else {

            fetchData(`${config.apiUrl}/app/v1/mostRecentReport/0001`, authData.token)
                .then(data => {
                    if (!data.body.auth) {
                        navigate('/');
                    } else {
                        if (!data.body.data) {

                            basicMessage('Sin reportes registrados')

                        } else {
                            const maxBrewId = findMaxBrewId(data.body.data.processData);
                            setBrewId(maxBrewId)

                        }


                    }
                })
                .catch(error => {
                    eventBasic('error', error)

                    navigate('/');
                });



        }


    }, []);


    const handledInputChange = (index, name, value) => {
        setInputValues(prevValues => ({
            ...prevValues,
            [index]: {
                ...prevValues[index],
                [name]: value
            }
        }))
    }




    const handledClickSave = () => {
       
        
        if (!inputValues[0]?.brand || !inputValues[0]?.volume || !inputValues[0]?.brewId || !inputValues[0]?.dateEnd || !inputValues[0]?.dateInit ) {
            
            textUnderMessage("¡Validar Información!", "Por favor, ingrese información válida y completa !", "warning")

        }else{
            const processData = preDatafreeProduction(dateSelected, turnSelected, inputValues)

            const report = dataNewReport(equipmentId, equipmentName, location, processData)
    
            console.log(processData)
    
            const authData = getLocalStorage('authData')
            if (!authData || !authData.auth && !authData.token) {
                navigate('/');
    
            } else {
                processingAction('Procesando Información', 'Por favor, espere ...')
    
                fetchSetReport(`${config.apiUrl}/app/v1/processData/addProduction`, authData.token, report
                ).then(response => {
                    closeSwal()
                    eventBasic('success', 'Producción Liberada!')
                }).catch(error => {
                    closeSwal()
                    eventBasic('error', error)
                })
            }
            setActivateFreeProduction(!activateFreeProduction)
            discardProduction()
    
    
    
    

        }
       

    }



    const handledChangeAmountProduction = (e) => {

        const inputValue = e.target.value;

        if (/^\d{1,2}$/.test(inputValue) || inputValue === '') {
            setAmountProductions(inputValue);
        }

    }

    const handledClickDiscard = () => {

        discardProduction()
    }



    return (
        <>

            <section>
                <div className="columns has-text-centered">
                    <div className="column pt-5">
                        <span className="custom-title-free">Liberar Producción de Turno</span>
                    </div>
                </div>
                <div className="columns">
                    <div className="column pt-5 pl-5 is-flex">
                        <span className="">Cantidad Cocimientos: </span>
                        <div className="field pl-6">
                            <div className="control is-custom-small-amount">
                                <input className="input is-small" type="number" value={amountProductions} onChange={handledChangeAmountProduction} min="0" max="50" step="1" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="columns  ">
                    <div className="column is-flex is-justify-content-center">
                        <div>
                            {Array.from({ length: amountProductions }, (_, index) => (
                                <InputsFreeProduction key={index} brewId={brewId} index={index} onInputChange={handledInputChange} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="columns pt-0 custom-postion-save">
                    <div className="column is-flex is-justify-content-center">
                        <div className="field is-grouped">
                            <div className="control ">
                                <button className="button is-link" onClick={handledClickSave} >Guardar</button>
                            </div>
                            <div className="control ">
                                <button className="button is-link is-light" onClick={handledClickDiscard}>Descartar</button>
                            </div>
                        </div>


                    </div>

                </div>


            </section>

        </>
    )
}

export default FreeProduction;












