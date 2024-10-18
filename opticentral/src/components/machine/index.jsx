import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../card";
import prensa from "../../assets/images/filtroPrensa.png";
import { flatArray } from "../services/preData"; // Asumo que esta función está bien definida.

function CardMachine({ equipmentData }) {
    const navigate = useNavigate();
    const [equipmentsMachine, setEquipmentsMachine] = useState([]);

    useEffect(() => {
        if (equipmentData && Object.keys(equipmentData).length > 0) {
            // Convertimos los datos de equipment a un array y los "aplanamos"
            const equipmentArray = Object.values(equipmentData);
            const flattenedArray = flatArray(equipmentArray);
            setEquipmentsMachine(flattenedArray); // Actualizamos el estado de la máquina aplanada
        }
    }, [equipmentData]);

    const handledCardClick = (equipment) => {
        navigate('/dashboard', { state: { equipment } });
    };

    return (
        <div className="pt-6">
            <div className="columns is-centered pt-6">
                {equipmentsMachine.length > 0 ? (
                    equipmentsMachine.map((equipment, index) => (
                        <div key={index} className="column is-one-fifth">
                            {equipment && (
                                <Card
                                    image={prensa}
                                    place={equipment.place}
                                    title={equipment.name}
                                    onClick={() => handledCardClick(equipment)}
                                />
                            )}
                        </div>
                    ))
                ) : (
                    <div>No hay datos disponibles.</div> // Mensaje de respaldo si no hay equipos
                )}
            </div>
        </div>
    );
}

export default CardMachine;

