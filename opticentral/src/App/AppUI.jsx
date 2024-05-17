import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/login";
import HomeRoute from "../components/home/HomeRoute"
import DashBoard from "../components/dashBoard";
import { AuthProvider } from "../components/context/AuthContext";

function AppUI() {
    

    return (
        <>

            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/home" element={<HomeRoute />} /> 
                        <Route path="/dashboard" element ={<DashBoard />} />               
                      
                    </Routes>
                </Router>
            </AuthProvider>

        </>
    )
}

export default AppUI;