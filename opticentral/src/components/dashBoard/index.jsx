import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar";

import MainDetail from "./MainDetail";
import FreeProduction from "./FreeProduction";
import AddReport from "./AddReport";
import TotalReportTime from "./TotalReportTime";
import { dataBrands } from "../../assets/data/data"

import { IoMdAddCircleOutline } from "react-icons/io";
import { fetchData } from "../services/fetchData";
import { fetchOneData } from "../services/fetchData";
import { getLocalStorage } from "../services/LocalStorage";
import { extractedReportData, extractedTotalTime } from "../services/preData"
import { NavbarContext } from "../context/NavbarContext";
import Gannt from "./Gannt";
import { DateContext } from "../context/DateContext";

import { basicMessage, textUnderMessage } from "../services/alerts";
import { ImInsertTemplate } from "react-icons/im";




function DashBoard() {



    const navigate = useNavigate();
    const location = useLocation();
    const isFirstRender = useRef();
    const { permissonsRole } = useContext(NavbarContext)
    const { dateContext } = useContext(DateContext);
    const { turnContext } = useContext(DateContext)
    const [activateDeatilProduction, setActivateDetailsProduction] = useState(true)
    const [activeTotalTime, setActiveTime] = useState(true)
    const [date, setDate] = useState(" ");
    const [dataTurn, setDataTurn] = useState("Turno 1");
    const [selectedDate, setSelectedDate] = useState();
    const [dataLength, setDataLength] = useState(0);
    const [reportLength, setReportLength] = useState(0);
    const [dataExtractedReport, setDataExtractedReport] = useState(0);
    const [report_id, setReport_id] = useState([]);
    const [processDataId, setProcessDataId] = useState([]);
    const [productionId, setProductionId] = useState([]);
    const [reportId, setReportId] = useState([]);
    const [brandName, setBrandName] = useState([]);
    const [volumeAmount, setVolemeAmount] = useState([]);
    const [brewId, setBrewId] = useState([]);
    const { equipment } = location.state || {};
    const { id, code, name, place } = equipment;
    const [dataSelected, setDataSelected] = useState();
    const [totalTimeExtraxtesReport, setTotalTimeExtractedReport] = useState(0)

    const [activeAddReport, setActiveAddReport] = useState(false)

    const brands = dataBrands()

    useEffect(()=>{
        if(permissonsRole){            
            setActiveTime(false)
            setActivateDetailsProduction(false)
        }else{
            setActiveTime(true) 
            setActivateDetailsProduction(true)
            setSelectedDate(!selectedDate)

        }

      
        
        
    },[permissonsRole])

    useEffect(() => {
        dateContext(date)
        turnContext(dataTurn)
        
        

        /* if (!isFirstRender.current) {
            isFirstRender.current = true;
            console.log('datods')
            return;
        } */
        if (permissonsRole) {    
               
           
            return;

        } else {
            
            const authData = getLocalStorage('authData')

            if (!authData || !authData.auth && !authData.token) {
                navigate('/')
            } else {
                //Peticion GET ApI   
                         

                fetchOneData('https://backendopticentral.onrender.com/app/v1/processData', code, date, dataTurn, authData.token).then(result => {

                    if (!result.body.auth) {
                        navigate('/')

                    } else {
                        
                        if (result.body && result.body.data && result.body.data.length > 0) {
                            if (!result.body.data[0].processData[0].release) {
                                textUnderMessage('Producción sin liberar', 'Informar al líder de turno', 'warning')
                                setReportLength(0)


                            } else {
                                //Obtiene informacion para agregar reportes  
                                setActiveTime(true)


                                const extractedReport = extractedReportData(result.body.data[0].processData[0].production)

                                setReportLength(extractedReport.length)
                                setDataExtractedReport(extractedReport)
                                const totalTimeExtracted = extractedTotalTime(extractedReport)
                                setTotalTimeExtractedReport(totalTimeExtracted)
                                setDataLength(result.body.data[0].processData[0].production.length)

                                const ids = result.body.data.map(item => item._id)


                                setReport_id(ids)

                                const processDataIds = result.body.data.flatMap(item => (
                                    item.processData.map(item => item._id)
                                ))

                                setProcessDataId(processDataIds);

                                const productionIds = result.body.data.flatMap(item => (
                                    item.processData.flatMap(process =>
                                        process.production.map(item => item._id)

                                    )
                                ))
                                //console.log('production id',productionIds)
                                setProductionId(productionIds)

                                const reportIds = result.body.data.flatMap(item => (
                                    item.processData.flatMap(process => (
                                        process.production.flatMap(report => (
                                            report.report.map(item => item._id)
                                        ))
                                    ))
                                ))
                                // console.log('report id', reportIds)
                                setReportId(reportIds)




                                const brands = result.body.data.flatMap(item =>
                                    item.processData.flatMap(process =>
                                        process.production.map(production => production.brand)
                                    )
                                );
                                setBrandName(brands);
                                const volumenes = result.body.data.flatMap(item =>
                                    item.processData.flatMap(process =>
                                        process.production.map(production => production.volume)
                                    )
                                );
                                setVolemeAmount(volumenes);

                                const brewIds = result.body.data.flatMap(item => (
                                    item.processData.flatMap(process =>
                                        process.production.map(production => production.brewId)
                                    )
                                ));

                                setBrewId(brewIds)



                            }

                        } else {
                            basicMessage('Sin datos registrados')
                            setDataLength(result.body.data.length)
                            setActiveTime(false)
                            setReportLength(0)

                        }
                    }
                }).catch(error => {
                    console.log(error)
                    navigate('/')
                })
            }

        }


    }, [selectedDate])

    const handledClickAdd = (data) => {
        setActivateDetailsProduction(!activateDeatilProduction)
        setActiveAddReport(true)
        setDataSelected(data)
        /* setSelectedDate(!selectedDate) */
    }
    const handledOnChangeDate = (e) => {
        setDate(e.target.value)
        setSelectedDate(!selectedDate)
    }
    const handledOnChangeTurn = (e) => {
        setDataTurn(e.target.value);
        setSelectedDate(!selectedDate);
    }
    return (
        <>
            <Navbar />

            <section >
                <div className=" is-flex is-justify-content-space-between pt-3">
                    <div className="columns pl-6 ml-6">

                        <div className="column">
                            <div className="field is-horizontal">

                                <div className="control is-expanded">
                                    <input className="input" type="date" value={date} onChange={handledOnChangeDate} />
                                </div>

                                <p className="control pl-2">
                                    <span className="select">
                                        <select name="turn" id="turn-select" value={dataTurn} onChange={handledOnChangeTurn}>
                                            <option>Turno 1</option>
                                            <option>Turno 2</option>
                                            <option>Turno 3</option>
                                        </select>
                                    </span>
                                </p>
                            </div>
                            <div className="box is-custom-box-gantt">

                                {Array.from({ length: reportLength }, (_, index) => (
                                    <Gannt key={index}
                                        index={index}
                                        bg='#BB8493'
                                        data={dataExtractedReport[index]}
                                    />
                                ))}




                            </div>
                        </div>
                    </div>

                    <div className="columns is-flex-grow-1 pr-6">
                        <div className="column">

                            <div className="has-text-centered">
                                <h1 className="title is-4">{name}</h1>
                            </div>



                            <div className="box is-custom-box-detail">

                                {activeTotalTime &&
                                    <TotalReportTime data={totalTimeExtraxtesReport} />
                                }

                                {activateDeatilProduction && Array.from({ length: dataLength }, (_, index) => (
                                    <MainDetail key={index} index={index} _id={report_id[0]} processDataId={processDataId[0]}
                                        productionId={productionId[index]} reportId={reportId[index]}
                                        brand={brandName[index]} volume={volumeAmount[index]} brewId={brewId[index]}
                                        handledClickAdd={handledClickAdd} />
                                ))}


                                {permissonsRole && <FreeProduction
                                    equipmentId={code}
                                    equipmentName={name}
                                    location={place} />}

                                {activeAddReport && <AddReport
                                    activeAddReport={activeAddReport}
                                    setActiveAddReport={setActiveAddReport}
                                    setActivateDetailsProduction={setActivateDetailsProduction}
                                    setSelectedDate = {setSelectedDate}
                                    selectedDate= {selectedDate}
                                    data={dataSelected} />}

                            </div>

                        </div>



                    </div>



                </div>





            </section>

        </>

    )
}











export default DashBoard;













