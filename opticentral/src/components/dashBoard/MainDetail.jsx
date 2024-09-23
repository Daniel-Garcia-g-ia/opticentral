import React from "react";

function MainDetail({ _id, processDataId, productionId, reportId, brand, volume, brewId, handledClickAdd }) {

    const handledClick =()=>{
        handledClickAdd({brand, _id, processDataId, productionId, reportId})
        
    }

    return (


        <>

            <div className="box-custom pt-1">
                <p className="is-flex is-justify-content-end ">
                    <span className="brand-title title is-6 is-custom-brand-add-report" onClick={handledClick}>{brand}</span>
                </p>

                <div className="field pt-1 is-horizontal">
                    <div className="field pl-3">
                        <span>Brew ID </span>
                        <div className="field ">
                            <p className="control">
                                <input className="input is-small is-success is-custom-wifth-amount-hl" type="number" name="brewId" defaultValue={brewId} disabled />
                            </p>
                        </div>
                    </div>
                    <div className="field pl-5 ">
                        <label className="">Cantidad Total</label>
                        <div className="field  has-addons">
                            <p className="control">
                                <input className="input is-small is-success is-custom-wifth-amount-hl" type="number" defaultValue={volume} disabled />
                            </p>
                            <p className="control">
                                <a className="button is-static is-small">
                                    Hl
                                </a>
                            </p>
                        </div>

                    </div>
                    <div className="field pl-5">
                        <label className="">Tiempo Total</label>
                        <div className="control is-custom-small">
                            <input className="input is-small" type="text" placeholder=" " disabled />
                        </div>
                    </div>
                    <div className="field pl-5">
                        <label className=""> Eficiencía  </label>
                        <div className="control is-custom-small">
                            <input className="input is-small" type="text" placeholder=" " disabled />
                        </div>
                    </div>
                    {/* <div className="field pl-5">
                        <label className=""> Total Averias  </label>
                        <div className="control is-custom-small">
                            <input className="input is-small" type="text" placeholder=" " disabled />
                        </div>
                    </div> */}
                </div>

            </div>



        </>
    )
}

export default MainDetail;