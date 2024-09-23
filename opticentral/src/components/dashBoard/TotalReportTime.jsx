import React from "react";
import { useState } from "react";


function TotalReportTime({ data }) {

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


    return (
        <>


            <div className="is-custom-total-time ">
                <div>
                    <p><span>Tiempo Reportado:</span></p>
                    <p><span style={{ color: getColor() }}>{data} h</span></p>

                </div>


            </div>


        </>

    )

}


export default TotalReportTime;