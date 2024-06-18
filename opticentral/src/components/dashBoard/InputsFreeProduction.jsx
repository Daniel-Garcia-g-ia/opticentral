import React, { useState } from "react";
import { dataBrands } from "../../assets/data/data";

function InputsFreeProduction({ brewId, index, onInputChange }) {
    const [formValue, setFormValue] = useState({
        brand: '',
        brewId: brewId,
        volume: 0,
        dateInit: '',
        dateEnd: '',
        release: false // Set initial release value to false
    });

    const brands = dataBrands();

    const handledChange = (e) => {
        const { name, value, type, checked } = e.target;

        const updatedValue = type === 'checkbox' ? checked : value;
        setFormValue((prevState) => ({
            ...prevState,
            [name]: updatedValue
        }));

        onInputChange(index, name, updatedValue);
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
                                        <input className="input is-small is-success is-custom-wifth-amount-hl" type="number" name="brewId" defaultValue={brewId} onChange={handledChange} />
                                    </p>
                                </div>
                            </div>
                            <div className="field pl-3">
                                <span>Volumen</span>
                                <div className="field pl-3 has-addons">
                                    <p className="control">
                                        <input className="input is-small is-success is-custom-wifth-amount-hl" type="number" name="volume" onChange={handledChange} />
                                    </p>
                                    <p className="control">
                                        <a className="button is-static is-small">
                                            Hl
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div className="field pl-3">
                                <label>Inicio</label>
                                <div className="control">
                                    <input className="input is-small" type="time" name="dateInit" onChange={handledChange} />
                                </div>
                            </div>
                            <div className="field pl-3">
                                <label>Fin</label>
                                <div className="control">
                                    <input className="input is-small" type="time" name="dateEnd" onChange={handledChange} />
                                </div>
                            </div>
                            <div className="field pl-3 pt-5">
                                <div className="field pl-3">
                                    <label className="checkbox">
                                        <input type="checkbox" name="release" checked={formValue.release} onChange={handledChange} />
                                        Liberar
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default InputsFreeProduction;
