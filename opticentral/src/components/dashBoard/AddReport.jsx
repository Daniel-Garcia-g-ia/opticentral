import React from "react";

function AddReport( {activeAddReport, setActiveAddReport}) {

    const HandledClickDismiss = ()=>{
        setActiveAddReport(false)
    }
    return (
        <>

            <section className="columns is-centered">
                <div >
                    <div className="columns is-centered has-text-centered ">

                        <div className="column">
                            <div className="field is-horizontal">

                                <div className="field ">
                                    <label className="label custom-label">Reportar</label>
                                    <div className="select is-small ">
                                        <select className="is-hovered custom-width-add-report ">
                                            <option>Avería</option>
                                            <option>With options</option>
                                        </select>
                                    </div>

                                </div>

                                <div className="field pl-6">
                                    <label className="label custom-label">Reportar</label>
                                    <div className="select is-small">
                                        <select className="is-hovered custom-width-add-report ">
                                            <option>Avería</option>
                                            <option>With options</option>
                                        </select>
                                    </div>


                                </div>

                                <div className="field pl-6">
                                    <label className="label custom-label">Reportar</label>
                                    <div className="select is-small">
                                        <select className="is-hovered custom-width-add-report ">
                                            <option>Avería</option>
                                            <option>With options</option>
                                        </select>
                                    </div>


                                </div>


                            </div>
                        </div>


                    </div>
                    <div className="columns is-centered has-text-centered ">

                        <div className="column">
                            <div className="field is-horizontal">

                                <div className="field ">
                                    <label className="label custom-label">Reportar</label>
                                    <div className="select is-small ">
                                        <select className="is-hovered custom-width-add-report  ">
                                            <option>Avería</option>
                                            <option>With options</option>
                                        </select>
                                    </div>

                                </div>

                                <div className="field pl-6">
                                    <label className="label custom-label">Reportar</label>
                                    <div className="select is-small">
                                        <select className="is-hovered custom-width-add-report ">
                                            <option>Avería</option>
                                            <option>With options</option>
                                        </select>
                                    </div>


                                </div>

                                <div className="field pl-6">
                                    <label className="label custom-label">Reportar</label>
                                    <div className="select is-small">
                                        <select className="is-hovered custom-width-add-report ">
                                            <option>Avería</option>
                                            <option>With options</option>
                                        </select>
                                    </div>


                                </div>


                            </div>
                        </div>


                    </div>
                    <label className="label custom-label pl-5">Hora de Reporte</label>

                    <div className="columns is-centered has-text-centered ">
                        <div className="column">
                            <div className="field is-horizontal">
                                <div className="field">
                                    <label className="label custom-label">Inicio</label>
                                    <div className="control">
                                        <input className="input" type="time" />
                                    </div>
                                </div>

                                <div className="field pl-3">
                                    <label className="label custom-label">Fin</label>
                                    <div className="control">
                                        <input className="input" type="time" />
                                    </div>
                                </div>
                                <div className="field pl-6">
                                    <label className="label custom-label">Solución</label>
                                    <div className="control ">
                                        <textarea class="textarea is-custom-width-textarea" ></textarea>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                    <div className="columns pt-5">
                        <div className="column is-flex is-justify-content-center">
                            <div className="field is-grouped">
                                <div className="control ">
                                    <button className="button is-link">Guardar</button>
                                </div>
                                <div className="control ">
                                    <button className="button is-link is-light" onClick={HandledClickDismiss}>Descartar</button>
                                </div>
                            </div>


                        </div>

                    </div>

                </div>



            </section>




        </>
    )
}

export default AddReport;