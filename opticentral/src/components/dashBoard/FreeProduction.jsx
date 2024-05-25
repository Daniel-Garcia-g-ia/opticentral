import React from "react";
import { useState, useEffect,useContext } from "react";
import { NavbarContext } from "../context/NavbarContext";
import InputsFreeProduction from "./InputsFreeProduction";

function FreeProduction() {

    const {discardProduction}= useContext(NavbarContext)

    const [amountProductions, setAmountProductions] = useState(0);

    useEffect(() => {
        console.log(amountProductions)
    }, [amountProductions])



    const handledChangeAmountProduction = (e) => {

        const inputValue = e.target.value;

        if (/^[0-5]$/.test(inputValue) || inputValue === '') {
            setAmountProductions(inputValue);
        }

    }

    const handledClickDiscard = ()=>{
        discardProduction()
    }


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
                                <input className="input is-small" type="number" value={amountProductions} onChange={handledChangeAmountProduction} min="0" max="5" step="1" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="columns  ">
                    <div className="column is-flex is-justify-content-center">
                        <div>
                            {Array.from({ length: amountProductions }, (_, index) => (
                                <InputsFreeProduction key={index} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="columns pt-0 custom-postion-save">
                    <div className="column is-flex is-justify-content-center">
                        <div className="field is-grouped">
                            <div className="control ">
                                <button className="button is-link">Guardar</button>
                            </div>
                            <div className="control ">
                                <button className="button is-link is-light" onClick={handledClickDiscard}>Descartar</button>
                            </div>
                        </div>


                    </div>

                </div>


            </section>

        </>
    )
}

export default FreeProduction;












