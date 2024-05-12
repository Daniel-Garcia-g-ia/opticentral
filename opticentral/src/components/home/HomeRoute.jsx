import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getLocalStorage } from '../services/LocalStorage';
import Home from './index';


function HomeRoute() {
    const { isLoggedIn } = useContext(AuthContext);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {



        const authData = getLocalStorage('authData')       

        if (!authData || !authData.auth && !authData.token) {
            setRedirect(true);
        } else {
            setRedirect(false);

        }
    }, [isLoggedIn]);

    return (
        <>
            {redirect ? (
                <Navigate to="/" />
            ) : (
                <Home />
            )}
        </>
    );
}

export default HomeRoute;
