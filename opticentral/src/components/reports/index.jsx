import React from "react";
import config from "../../../config";
import { useNavigate } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";
import { useState, useEffect, useContext } from "react";
import { NavbarContext } from "../context/NavbarContext";
import { preDataDownLoad } from "../services/preData"
import { fetchDataDownLoad } from "../services/fetchData";
import { getLocalStorage } from "../services/LocalStorage";
import { generateExcel } from "../services/generateEcxel";
import { basicMessage, textUnderMessage, processingAction, closeSwal, eventBasic } from "../services/alerts";


function ExcelReport() {
    const navigate = useNavigate();
    const { report } = useContext(NavbarContext);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [update, setUpdate] = useState(false);
    const [dataReport, setDataReport]= useState();
    const [dataReportOpi, setDataReportOpi]= useState();
    const [releaseReport, setReleaseReport]= useState(false);
    const [releaseReportOpi, setReleaseReportOpi]= useState(false);

    useEffect(() => {
        const data = preDataDownLoad(startDate, endDate);
        const authData = getLocalStorage('authData');
        if (!authData || (!authData.auth && !authData.token)) {
          console.log('error');
        } else {
          processingAction('Validando información', 'Por favor espere...', true);
          Promise.all([
            fetchDataDownLoad(`${config.apiUrl}/app/v1/download`, authData.token, data),
            fetchDataDownLoad(`${config.apiUrl}/app/v1/download-opi`, authData.token, data)
          ])
            .then(([result, resultOpi]) => {
              setDataReport(result);
              setDataReportOpi(resultOpi);
              // Una vez que ambas respuestas han llegado, se genera el Excel.
              generateExcel(result, resultOpi);
              closeSwal();
            })
            .catch(error => {
              processingAction(null, null, false);
              eventBasic('error', `error: ${error}`);
              closeSwal();
            });
        }
      }, [update]);
      


    const handleClickBack = () => {
        report(false)

        navigate('/home');
    }

    const handleChangeStart = (e) => {
        setStartDate(e.target.value)

    }
    const handleClickEnd = (e) => {
        setEndDate(e.target.value)
    }
    const handleClickDownload = () => {
        setUpdate(!update)


    }

    return (
        <>

            <section className="custom-container-main-report">
                <p className="pt-2"><TiArrowBackOutline size={34} onClick={handleClickBack} /></p>


                <div className="box custom-box-report">
                    <div className="field is-horizontal">
                        <div className="field">
                            <span>Inicio</span>
                            <div className="control is-expanded pt-2">
                                <input className="input" type="date" value={startDate} onChange={handleChangeStart} />
                            </div>

                        </div>
                        <div className="field">
                            <span>fin</span>
                            <div className="control is-expanded pt-2 pl-2">
                                <input className="input" type="date" value={endDate} onChange={handleClickEnd} />
                            </div>

                        </div>
                        <div className="buttons pl-2">
                            <button className="button is-success" onClick={handleClickDownload} >Descargar</button>

                        </div>



                    </div>


                </div>

            </section>



        </>
    )
};

export default ExcelReport;