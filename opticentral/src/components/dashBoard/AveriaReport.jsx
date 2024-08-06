import React from "react";
import { useState, useEffect } from "react";
import { calculateTimeDifference } from "../services/calculateTimeDifference";




function AveriaReport (){

    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [timeDifference, setTimeDifference]= useState(0);

   /*  useEffect(()=>{
        
    },[]) */

    
    
    const handledChangeInputStart = (e)=>{
        const value = e.target.value;    
        setStartTime(value);
        const totalTimeDifference = calculateTimeDifference(value, endTime);
        setTimeDifference(totalTimeDifference)

    }

    const handledChangeInputEnd = (e)=>{
        const value = e.target.value;
        setEndTime(value);
        const totalTimeDifference= calculateTimeDifference(startTime, value);
        setTimeDifference(totalTimeDifference);

    }



    return (
        <>
        <section className="columns is-centered">

                <label className="custom-label-total-report-averia">Tiempo Total de Avería: {timeDifference} h</label>
                

                <div className="columns is-centered has-text-centered">
                    <div className="column">
                        <div className="field is-horizontal pt-5">

                            <div className="field">
                                <label className="label custom-label">Inicio</label>
                                <div className="control">
                                    <input className="input is-small" type="time" value={startTime} onChange={handledChangeInputStart} />
                                </div>
                            </div>

                            <div className="field pl-3">
                                <label className="label custom-label">Fin</label>
                                <div className="control">
                                    <input className="input is-small" type="time" value={endTime} onChange={handledChangeInputEnd} />
                                </div>
                            </div>               




                        </div>



                    </div>


                </div>

            </section>
        </>
    )
}

export default AveriaReport