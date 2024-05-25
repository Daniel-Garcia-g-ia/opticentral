import React from "react";
import { useContext } from "react";
import { NavbarContext } from "../context/NavbarContext";

function Navbar() {

    const {production}= useContext(NavbarContext)

    const handeldClickProduction =()=>{

        production()
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
                                <a className="navbar-item  ">
                                    Home
                                </a>

                                <a className="navbar-item" onClick={handeldClickProduction}>
                                    Producción
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