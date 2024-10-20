import React, { useContext, useEffect, useState } from 'react';
import config from '../../../config';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getLocalStorage } from '../services/LocalStorage';
import Home from './index';
import { fetchData } from '../services/fetchData';
import { processingAction, eventBasic, closeSwal } from '../services/alerts';

function HomeRoute() {
    
    const { isLoggedIn } = useContext(AuthContext);

    const [redirect, setRedirect] = useState(false);
    const [equipmentData, setEquipmentData] = useState(null); // Inicializamos en null
    

    useEffect(() => {
        processingAction('Validando información', 'Por favor espere...', true);
        const authData = getLocalStorage('authData');
        
        if (!authData || !authData.auth || !authData.token) {
            closeSwal();
            setRedirect(true);
        } else {
            // Petición GET a la API
            fetchData(`${config.apiUrl}/app/v1/equipments`, authData.token)
                .then(data => {
                    if (!data.body.auth) {
                        closeSwal();
                        eventBasic('Error de conexión', 'No se encuentra área en DB');
                        setRedirect(true);
                    } else {
                        closeSwal();
                        setEquipmentData(data.body.equipments); // Aquí los datos se almacenan en el estado
                    }
                })
                .catch(error => {
                    closeSwal();
                    eventBasic('Error', `error: ${error}`);
                    setRedirect(true);
                });
        }
    }, []); // Solo corre al cargar el componente

    // Este useEffect se disparará cuando `equipmentData` cambie de valor
    useEffect(() => {
        if (equipmentData) {
            console.log(equipmentData); // Ahora los datos se han actualizado
        }
    }, [equipmentData]);

    // Si `equipmentData` no se ha cargado, mostramos el mensaje de carga o redirigimos si es necesario
    if (redirect) {
        return <Navigate to="/" />;
    }

    if (!equipmentData) {
        return <div>Cargando datos de equipos...</div>; // Puedes mostrar un mensaje de carga si los datos aún no se obtienen
    }

    return (
        <Home equipmentData={equipmentData} /> 
    );
}

export default HomeRoute;

