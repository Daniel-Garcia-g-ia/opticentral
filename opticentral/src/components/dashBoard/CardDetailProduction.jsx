import React from "react";

import { LiaEditSolid } from "react-icons/lia";

function CardDetailProduction({ data, handledHover, handledOut, activateEditModal, handleClickEdit }) {
    const { startTime, endTime, name, totalTime, bg } = data.data.item    

    return (

        <>

            <div className="card is-custom-card-model-detail"
                onMouseEnter={handledHover}
                onMouseLeave={!activateEditModal ? handledOut : undefined}
            >

                <header className="is-flex is-justify-content-space-between pl-5 pr-5 pt-3 pb-3">
                    <div className="is-flex-direction-column">
                        <p className="">Inicio: <span className="pl-3">{startTime}</span>  </p>
                        <p>Final: <span className="pl-3">{endTime}</span>   </p>

                    </div>
                    <div className="">
                        <span>Total: {totalTime} h</span>

                    </div>


                </header>

                <div className="is-custom-separator ml-5 mr-5" >
                </div>
                <div className=" is-flex is-justify-content-end pr-5">
                    <p className="subtitle" style={{ color: `${bg}` }}>{name}</p>
                </div>


                <div className="card-content">
                    {/* <p className="">Reporte: <span className="pl-3">{ }</span>  </p> */}
                    <p className="">Marca: <span className="pl-3">{data.brand}</span>  </p>
                    <p className="">BrewId: <span className="pl-3">{data.brewId}</span>  </p>


                </div>
                <div className="is-custom-edit">
                    <span onClick={handleClickEdit}><LiaEditSolid size={34} /></span>

                </div>



            </div>
        </>
    )
}

export default CardDetailProduction