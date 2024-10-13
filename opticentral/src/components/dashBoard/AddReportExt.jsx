import React from "react";
import './index.css'
import {useState, useEffect} from "react"
import ICReport from "./ICReport";
import ECReport from "./ECReport";
import DPAReport from "./DPAReport";
import NSTReport from "./NSTReport";

function AddReportExt({setActivateDetailsProduction,  setActivateReportExt}) {

    const [activateICReport, setActivateICReport]= useState(false);
    const [activateECReport, setActivateECReport]= useState(false);
    const [activateDPAReport, setActivateDPAReport]= useState(false);
    const [activateNSTReport, setAcvateNSTReport]= useState(false);
    
    const [typeReport, setTypeReport]=useState(' ')

    useEffect(()=>{
        setActivateDetailsProduction(false)
    },[])
    


        useEffect(()=>{

            if (typeReport === 'IC') {
                
                setActivateICReport(true);
                setActivateECReport(false)
                setActivateDPAReport(false);
                setAcvateNSTReport(false);
               
            }else if(typeReport === 'EC'){

                setActivateECReport(true);
                setActivateICReport(false);
                setActivateDPAReport(false);
                setAcvateNSTReport(false);


            }else if(typeReport === 'DPA'){
                setActivateDPAReport(true);
                setActivateECReport(false);
                setActivateICReport(false);
                setAcvateNSTReport(false);


            }else if(typeReport === 'NST'){
                setAcvateNSTReport(true);
                setActivateDPAReport(false);
                setActivateECReport(false);
                setActivateICReport(false);

            }

            

        },[typeReport])


    const handledChance = (e)=>{
        setTypeReport(e.target.value)
        

    }

    const handledClickDismiss =()=>{
        setActivateReportExt(false)  
        setActivateDetailsProduction(true)     

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
                                <button className="button is-link" >Guardar</button>
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