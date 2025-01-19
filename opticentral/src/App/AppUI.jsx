import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/login";
import HomeRoute from "../components/home/HomeRoute"
import DashBoard from "../components/dashBoard";
import ExcelReport from "../components/reports";
import { AuthProvider } from "../components/context/AuthContext";
import { NavbarProvider } from "../components/context/NavbarContext";
import { DateProvider } from "../components/context/DateContext";
import { ReportProvider } from "../components/context/ReportContext";
import { UpdateProvider } from "../components/context/UpdateContext";

function AppUI() {


    return (<>

        <ReportProvider>
            <NavbarProvider>
                <DateProvider>
                    <AuthProvider>
                        <UpdateProvider>
                            <Router>
                                <Routes>
                                    <Route path="/" element={<Login />} />
                                    <Route path="/home" element={<HomeRoute />} />
                                    <Route path="/dashboard" element={<DashBoard />} />
                                    <Route path="/report" element={<ExcelReport />} />
                                </Routes>
                            </Router>
                        </UpdateProvider>
                    </AuthProvider>
                </DateProvider>
            </NavbarProvider>
        </ReportProvider>


    </>
    )
}

export default AppUI;