import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getLocalStorage } from '../services/LocalStorage';
import Home from './index';
import { fetchData } from '../services/fetchData';
import { processingAction, eventBasic, closeSwal } from '../services/alerts';
import { IoConstructOutline } from 'react-icons/io5';


function HomeRoute() {
    const { isLoggedIn } = useContext(AuthContext);
    const [redirect, setRedirect] = useState(false);
    const [equipmentData, setEquipmentData] = useState({});

    useEffect(() => { 
        processingAction('Validando informacíon','Por favor espere...',true) 
        const authData = getLocalStorage('authData')
        if (!authData || !authData.auth && !authData.token) {         
            closeSwal()
            setRedirect(true);
        } else {
            //Peticion GET ApI
           
            fetchData('https://backendopticentral.onrender.com/app/v1/equipments',authData.token).then(data =>{
                if(!data.body.auth){
                    closeSwal()
                    eventBasic('Error de conexión','No se encuentra área en DB')
                    setRedirect(true);  
                    
                }else{
                    closeSwal()
                    setEquipmentData(data.body.equipments)
                    setRedirect(false);
                    
                }
            }).catch(error=>{
                eventBasic('Error',`error:${error}`)
                setRedirect(true)
            })          

        }
    },[]);

    return (
        <>
            {redirect ? (
                <Navigate to="/" />
            ) : (
                <Home equipmentData={equipmentData} />
            )}
        </>
    );
}

export default HomeRoute;
