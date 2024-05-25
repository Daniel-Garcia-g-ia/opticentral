import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getLocalStorage } from '../services/LocalStorage';
import Home from './index';
import { fetchData } from '../services/fetchData';


function HomeRoute() {
    const { isLoggedIn } = useContext(AuthContext);
    const [redirect, setRedirect] = useState(false);
    const [equipmentData, setEquipmentData] = useState({});

    useEffect(() => {


       
        const authData = getLocalStorage('authData')



        if (!authData || !authData.auth && !authData.token) {           
           
            setRedirect(true);
        } else {
            //Peticion GET ApI
            fetchData('http://localhost:3000/app/v1/equipments',authData.token).then(data =>{
                if(!data.body.auth){
                    setRedirect(true);
                }else{
                    setEquipmentData(data.body.equipments)
                    setRedirect(false);
                }
            }).catch(error=>{
                setRedirect(true)
            })
            
            
           
            

        }
    }, [isLoggedIn]);

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
