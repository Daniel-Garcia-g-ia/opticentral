import React from "react";

function MainDetail() {
    return (
        <>

            <p className="is-flex">
                <h4 className="title is-6"> Nombre de la receta</h4>
            </p>

            <div className="field pt-5 is-horizontal">
                <div className="field">
                    <label className="label">Cantidad Total</label>
                    <div className="control is-custom-small">
                        <input className="input is-small" type="text" placeholder=" " disabled />
                    </div>
                </div>
                <div className="field pl-5">
                    <label className="label">Tiempo Total</label>
                    <div className="control is-custom-small">
                        <input className="input is-small" type="text" placeholder=" " disabled />
                    </div>
                </div>
                <div className="field pl-5">
                    <label className="label "> Eficiencía  </label>
                    <div className="control is-custom-small">
                        <input className="input is-small" type="text" placeholder=" " disabled />
                    </div>
                </div>
            </div>
            <div className="field pt-1 is-horizontal">
                <div className="field">
                    <label className="label">Total Averias</label>
                    <div className="control is-custom-small">
                        <input className="input is-small" type="text" placeholder=" " disabled />
                    </div>
                </div>
                <div className="field pl-5">
                    <label className="label">Tiempo Cip</label>
                    <div className="control is-custom-small">
                        <input className="input is-small" type="text" placeholder=" " disabled />
                    </div>
                </div>
                <div className="field pl-5">
                    <label className="label ">Paros Externos </label>
                    <div className="control is-custom-small">
                        <input className="input is-small" type="text" placeholder=" " disabled />
                    </div>
                </div>
                <div className="field pl-5">
                    <label className="label ">Turno NO Prog  </label>
                    <div className="control is-custom-small">
                        <input className="input is-small" type="text" placeholder=" " disabled />
                    </div>
                </div>
                <div className="field pl-5">
                    <label className="label "> Tiempo COP  </label>
                    <div className="control is-custom-small">
                        <input className="input is-small" type="text" placeholder=" " disabled />
                    </div>
                </div>
            </div>

        </>
    )
}

export default MainDetail;