import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/login";
import HomeRoute from "../components/home/HomeRoute"
import DashBoard from "../components/dashBoard";
import { AuthProvider } from "../components/context/AuthContext";
import { NavbarProvider } from "../components/context/NavbarContext";
import { DateProvider } from "../components/context/DateContext";
import { ReportProvider } from "../components/context/ReportContext";

function AppUI() {


    return (       <>

            <ReportProvider>
                <NavbarProvider>
                    <DateProvider>
                        <AuthProvider>

                            <Router>
                                <Routes>
                                    <Route path="/" element={<Login />} />
                                    <Route path="/home" element={<HomeRoute />} />
                                    <Route path="/dashboard" element={<DashBoard />} />

                                </Routes>
                            </Router>

                        </AuthProvider>
                    </DateProvider>
                </NavbarProvider>
            </ReportProvider>


        </>
    )
}

export default AppUI;