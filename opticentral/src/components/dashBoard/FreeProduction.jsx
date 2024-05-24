import React from "react";

function FreeProduction() {
    return (
        <>

            <section>
                <div className="columns has-text-centered">
                    <div className="column pt-5">
                        <span className="custom-title-free">Liberar Producción de Turno</span>
                    </div>
                </div>
                <div className="columns">
                    <div className="column pt-5 pl-5 is-flex">
                        <span className="">Cantidad Filtraciones: </span>
                        <div className="field pl-6">
                            <div className="control is-custom-small-amount">
                                <input className="input is-small" type="number" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns has-text-centered">

                    <div className="column">

                        <div className="field is-horizontal">


                            <div className="field ">
                                <span>Marca </span>
                                <div className="control ">
                                    <select className="select is-small is-custom-with-select">
                                        <option></option>
                                        <option>Andina</option>
                                        <option>Andina Ligth</option>


                                    </select>
                                </div>

                            </div>
                            <div className="field pl-3">
                                <span>Brew ID </span>
                                <div className="field pl-3 has-addons">
                                    <p className="control">
                                        <input className="input is-small is-success is-custom-wifth-amount-hl " type="number" />
                                    </p>

                                </div>

                            </div>

                            <div className="field pl-3">
                                <span>Volumen</span>
                                <div className="field pl-3 has-addons">
                                    <p className="control">
                                        <input className="input is-small is-success is-custom-wifth-amount-hl " type="number" />
                                    </p>
                                    <p className="control">
                                        <a className="button is-static is-small">
                                            Hl
                                        </a>
                                    </p>

                                </div>

                            </div>

                            <div className="field pl-3">
                                <span>Cocimiento</span>
                                <div className="field pl-3 has-addons">
                                    <p className="control">
                                        <input className="input is-small is-success is-custom-wifth-amount-hl " type="number" />
                                    </p>
                                    <p className="control">
                                        <a className="button is-static is-small">
                                            #
                                        </a>
                                    </p>

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
                                <button className="button is-link is-light">Descartar</button>
                            </div>
                        </div>


                    </div>

                </div>


            </section>

        </>
    )
}

export default FreeProduction;