import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar";
import MainDetail from "./MainDetail";
import FreeProduction from "./FreeProduction";
import AddReport from "./AddReport";

import { IoMdAddCircleOutline } from "react-icons/io";



function DashBoard() {
    const location = useLocation();
    const {equipment}= location.state || {}

    const [activeAddReport, setActiveAddReport] = useState(false)

    useEffect(() => {
        console.log(equipment)



    }, [activeAddReport])

    const handledClickAdd = () => {
        setActiveAddReport(true)
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
                                    <input className="input" type="date" />
                                </div>

                                <p className="control pl-2">
                                    <span className="select">
                                        <select name="" id="">
                                            <option defaultValue> turno 1</option>
                                            <option>Turno 2</option>
                                            <option>Turno 3</option>
                                        </select>
                                    </span>
                                </p>
                            </div>
                            <div className="box is-custom-box-gantt">
                                <span className="custom-position-add" onClick={handledClickAdd}>
                                    < IoMdAddCircleOutline size={26} />
                                </span>


                            </div>
                        </div>
                    </div>

                    <div className="columns is-flex-grow-1 pr-6">
                        <div className="column">

                            <div className="has-text-centered">
                                <h1 className="title is-4">Mash Filter</h1>
                            </div>



                            <div className="box is-custom-box-detail">

                                {/* <MainDetail /> */}
                                <FreeProduction />

                                { activeAddReport && <AddReport activeAddReport={activeAddReport} setActiveAddReport={setActiveAddReport} />}






                            </div>

                        </div>



                    </div>



                </div>





            </section>

        </>

    )
}











export default DashBoard;













