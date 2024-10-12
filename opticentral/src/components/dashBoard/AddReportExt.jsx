import React from "react";
import './index.css'
import {useState, useEffect} from "react"
import ICReport from "./ICReport";

function AddReportExt({setActivateDetailsProduction}) {

    const [activateICReport, setActivateICReport]= useState(false);
    
    const [typeReport, setTypeReport]=useState(' ')

    useEffect(()=>{
        setActivateDetailsProduction(false)
    })
    


        useEffect(()=>{

            if (typeReport === 'IC') {
                
                setActivateICReport(true);
               
            }

            

        },[typeReport])


    const handledChance = (e)=>{
        setTypeReport(e.target.value)
        

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
                    




                    <div className="column is-flex is-justify-content-center">
                        <div className="field is-grouped">
                            <div className="control ">
                                <button className="button is-link" >Guardar</button>
                            </div>
                            <div className="control ">
                                <button className="button is-link is-light" >Descartar</button>
                            </div>
                        </div>


                    </div>




                </div>



            </section>
        </>
    )
}

export default AddReportExt