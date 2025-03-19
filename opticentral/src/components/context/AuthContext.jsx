import React, { useState, createContext, useEffect } from "react";
import { setLocalStorage } from "../services/LocalStorage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Inicializa isLoggedIn leyendo de localStorage, o false si no existe
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedStatus = localStorage.getItem('isLoggedIn');
    return storedStatus ? JSON.parse(storedStatus) : false;
  });

  const [dataName, setDataName] = useState();
  const [dataToken, setDataToken] = useState();

  // Actualiza localStorage cada vez que isLoggedIn cambie
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const login = (userData) => {
    console.log(userData);

    if (userData.status === 200 && userData.body.auth) {
      setLocalStorage('authData', userData.body);
      setIsLoggedIn(true);
    } else {
      logout();
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
