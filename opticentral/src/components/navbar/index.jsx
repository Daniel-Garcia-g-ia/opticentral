import React from "react";
import { useContext, useState, useEffect } from "react";
import { NavbarContext } from "../context/NavbarContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate()
    const { production } = useContext(NavbarContext)
    const { isLoggedIn } = useContext(AuthContext)
    const { report } = useContext(NavbarContext)
    const { activateReport } = useContext(NavbarContext)
    const [activate, setActivate] = useState(false);


    useEffect(() => {


        if (activateReport) {
            navigate('/report')
        }

    }, [activate])

    const handeldClickProduction = () => {

        if (isLoggedIn) {
            production()

        }
      



    }

    const handeldClickReport = () => {

        if (isLoggedIn) {
            report(true)
            setActivate(!activate)          

        }

       
    }

    return (

        <>
            <div className="columns is-centered pt-2">
                <div className="column is-three-quarters">



                    <nav className="navbar is-four-fifths " role="navigation" aria-label="main navigation">
                        <div className="navbar-brand pl-6">


                            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                            </a>
                        </div>

                        <div id="navbarBasicExample" className="navbar-menu ">
                            <div className="navbar-start">
                                {/* <a className="navbar-item  ">
                                    Home
                                </a> */}

                                <a className="navbar-item" onClick={handeldClickProduction}>
                                    Producción
                                </a>
                                <a className="navbar-item" onClick={handeldClickReport}>
                                    Reporte
                                </a>

                                <div className="navbar-item has-dropdown is-hoverable">
                                    <a className="navbar-link ">
                                        More
                                    </a>

                                    <div className="navbar-dropdown">
                                        <a className="navbar-item ">
                                            About
                                        </a>
                                        <a className="navbar-item is-selected ">
                                            Jobs
                                        </a>
                                        <a className="navbar-item ">
                                            Contact
                                        </a>
                                        <hr className="navbar-divider" />
                                        <a className="navbar-item">
                                            Report an issue
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="navbar-end pr-6">
                                <a className="navbar-item has-text-link">
                                    Sing in
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>

            </div>


        </>
    )
}

export default Navbar;