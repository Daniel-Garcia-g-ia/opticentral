import React from "react";
import Navbar from "../navbar";

function DashBoard() {
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
                                            <option selected> turno 1</option>
                                            <option>Turno 2</option>
                                            <option>Turno 3</option>
                                        </select>
                                    </span>
                                </p>
                            </div>
                            <div className="box is-custom-box-gantt">


                            </div>
                        </div>
                    </div>

                    <div className="columns is-flex-grow-1 pr-6">
                        <div className="column has-text-centered">
                            <h1 className="title is-4">Mash Filter</h1>
                            <div className="box is-custom-box-detail">


                            </div>

                        </div>



                    </div>



                </div>





            </section>

        </>

    )
}











export default DashBoard;













