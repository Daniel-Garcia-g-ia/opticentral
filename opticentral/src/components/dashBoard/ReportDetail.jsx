import React from "react";

function ReportDetail({ data, setActiveDetail }) {

    const { inicio, fin, name, tiempoTotal, bg } = data


    const handledHover = () => {
        setActiveDetail(true)
    }

    const handledOut = () => {
        setActiveDetail(false)
    }



    return (
        <>
            <div className="card is-custom-card-model-detail"
                onMouseEnter={handledHover}
                onMouseLeave={handledOut}
            >

                <header className="is-flex is-justify-content-space-between pl-5 pr-5 pt-3 pb-3">
                    <div className="is-flex-direction-column">
                        <p className="">Inicio: <span className="pl-3">{inicio}</span>  </p>
                        <p>Fin: <span className="pl-3">{fin}</span>   </p>

                    </div>
                    <div className="">
                        <span>Total: {tiempoTotal} h</span>

                    </div>


                </header>

                <div className="is-custom-separator ml-5 mr-5" >
                </div>
                <div className=" is-flex is-justify-content-end pr-5">
                    <p className="subtitle" style={{color:`${bg}`}}>{name}</p>
                </div>
                 

                <div className="card-content">
                    {/* <p className="">Reporte: <span className="pl-3">{ }</span>  </p> */}
                    <p className="">Marca: <span className="pl-3">{data.marca }</span>  </p>
                    <p className="">BrewId: <span className="pl-3">{ data.brewId}</span>  </p>


                </div>






            </div>


        </>
    )


}


export default ReportDetail;