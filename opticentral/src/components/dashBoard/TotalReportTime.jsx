import React from "react";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";


function TotalReportTime({ data, setActivateReportExt, activeAddIcon }) {

    

    let time = data

    const getColor = () => {
        if (time < 8) {
            return 'red'
        } else if (time === 8) {
            return 'green'
        } else {
            return 'black'
        }
    }
    const handledClickAdd = ()=>{
        setActivateReportExt(true)
    }

    return (
        <>


            <div className="is-custom-total-time  is-flex is-justify-content-space-between ">
                <div>
                    <p><span>Tiempo Reportado:</span></p>
                    <p><span style={{ color: getColor() }}>{data} h</span></p>

                </div>
                { activeAddIcon &&<div className='is-custom-add-report-icon' onClick={handledClickAdd} disabled >

                   <span><IoIosAddCircleOutline size={34} /></span>
                    
                </div>}


            </div>


        </>

    )

}


export default TotalReportTime;