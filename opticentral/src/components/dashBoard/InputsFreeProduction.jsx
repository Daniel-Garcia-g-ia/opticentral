import React, { useState } from "react";
import { dataBrands } from "../../assets/data/data";
import config from "../../../config";

function InputsFreeProduction({ brewId, index, onInputChange }) {
    const [formValue, setFormValue] = useState({
        brand: null,
        brewId: brewId,
        volume: null,
        dateInit: null,
        dateEnd: null,
        release: true // Set initial release value to false
    });

    const brands = dataBrands();
    
    const handledChange = (e) => {
        const { name, value } = e.target;

        setFormValue((prevState) => ({
            ...prevState,
            [name]: value
        }));

        onInputChange(index, name, value);
    };



    return (
        <>
            <form action="">
                <div className="columns has-text-centered">
                    <div className="column pt-0">
                        <div className="field is-horizontal">
                            <div className="field">
                                <span>Marca </span>
                                <div className="control">
                                    <select className="select is-small is-custom-with-select" name='brand' onChange={handledChange}>
                                        <option value=""> </option>
                                        {brands.map((brand, index) => (
                                            <option key={index} value={brand}>
                                                {brand}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="field pl-3">
                                <span>Brew ID </span>
                                <div className="field pl-3 has-addons">
                                    <p className="control">
                                        <input className="input is-small is-success is-custom-wifth-amount-hl" type="text" inputMode="numeric" name="brewId" defaultValue={brewId} onChange={handledChange} />
                                    </p>
                                </div>
                            </div>
                            <div className="field pl-3">
                                <span>Volumen</span>
                                <div className="field pl-3 has-addons">
                                    <p className="control">
                                        <input className="input is-small is-success is-custom-wifth-amount-hl" type="number" name="volume" onChange={handledChange} defaultValue={null} />
                                    </p>
                                    <p className="control">
                                        <a className="button is-static is-small">
                                            Hl
                                        </a>
                                    </p>
                                </div>
                            </div>
                            {/* <div className="field pl-3">
                                <label>Inicio</label>
                                <div className="control">
                                    <input className="input is-small" type="time" name="dateInit" onChange={handledChange} formart='HH:mm' step='60' min="00:00" max='23:59' />
                                </div>
                            </div>
                            <div className="field pl-3">
                                <label>Fin</label>
                                <div className="control">
                                    <input className="input is-small" type="time" name="dateEnd" onChange={handledChange} step='60' min="00:00" max='23:59'/>
                                </div>
                            </div> */}
                                        
                                        
                            
                            {/* <div className="field pl-3 pt-5">
                                <div className="field pl-3">
                                    <label className="checkbox">
                                        <input type="checkbox" name="release" checked={formValue.release} onChange={handledChange} />
                                        Liberar
                                    </label>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default InputsFreeProduction;
