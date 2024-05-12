import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/login";
import Home from "../components/home"
import { AuthProvider } from "../components/context/AuthContext";

function AppUI() {

    return (
        <>

            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/home" element={<Home />} />                       
                      
                    </Routes>
                </Router>
            </AuthProvider>

        </>
    )
}

export default AppUI;