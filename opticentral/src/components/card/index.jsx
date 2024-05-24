import React from "react";


function Card({ image, place, title, onClick }) {
    return (
        <>

            <div className="is-card" onClick={onClick}>

                <div className="">

                    <div className="gradient-overlay">
                        <div className="is-custom-area pl-3 pt-2">
                            <span> {place}</span>
                        </div>
                        <div className="is-custom-machine pl-3 pt-2">
                            <span>{title}</span>
                        </div>
                    </div>

                    <div className="is-custom-card">
                        <div className="is-custom-image-card-size m">
                            <figure className="">
                                <img src={image} alt="Machine" />
                            </figure>
                        </div>
                    </div>


                </div>




            </div>

        </>
    )
}














export default Card;