import React from "react";

function InputsFreeProduction() {

    return (
        <>
            <form action="">
                <div className="columns has-text-centered">

                    <div className="column pt-0">

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

            </form>
        </>
    )

}

export default InputsFreeProduction;