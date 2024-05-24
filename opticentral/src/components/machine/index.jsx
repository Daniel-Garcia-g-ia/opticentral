import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../card"
import prensa from "../../assets/images/filtroPrensa.png";
import bmf from "../../assets/images/bmf.png"
import { flatArray } from "../services/preData";


function CardMachine({ equipmentData }) {
    const navigate = useNavigate();
    const [equipmentId, setEquipmentId] = useState('')
    const [equipmentArray, setEquipmentArray] = useState([])
    const [equipments, setEquipments] = useState([])

    useEffect(() => {
        setEquipmentArray(Object.values(equipmentData));

        setEquipments(flatArray(equipmentArray));

    }, [equipmentData]);

    const handledCardClick = (equipment) => {
        
        navigate('/dashboard',{state:{equipment}})
    }

    return (
        <>
            <div className=" pt-6">
                <div className="columns is-centered pt-6 ">
                    {equipments.map((equipment, index) => (
                        <div key={index} className="column is-one-fifth">
                            {equipment && (
                                <Card image={prensa} place={equipment.place} title={equipment.name} onClick={() => handledCardClick(equipment.code)} />
                            )}
                        </div>
                    ))}
                </div>

            </div>

        </>
    );
}

export default CardMachine;


