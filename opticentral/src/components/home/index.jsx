import React, { useContext } from "react";
import Navbar from "../navbar";
import Machine from "../machine";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function Home(equipmentData) {

    return (
        <>
        <Navbar />

        <Machine equipmentData={equipmentData} />


            
        </>

    )
}

export default Home;