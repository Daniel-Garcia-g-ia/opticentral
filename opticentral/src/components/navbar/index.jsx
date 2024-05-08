import React from "react";

function Navbar() {
    return (

        <>
            <div className="columns is-centered pt-2">
                <div className="column is-three-quarters">



                    <nav class="navbar is-four-fifths " role="navigation" aria-label="main navigation">
                        <div class="navbar-brand pl-6">


                            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                            </a>
                        </div>

                        <div id="navbarBasicExample" class="navbar-menu ">
                            <div class="navbar-start">
                                <a class="navbar-item  ">
                                    Home
                                </a>

                                <a class="navbar-item ">
                                    Documentation
                                </a>

                                <div class="navbar-item has-dropdown is-hoverable">
                                    <a class="navbar-link ">
                                        More
                                    </a>

                                    <div class="navbar-dropdown">
                                        <a class="navbar-item ">
                                            About
                                        </a>
                                        <a class="navbar-item is-selected ">
                                            Jobs
                                        </a>
                                        <a class="navbar-item ">
                                            Contact
                                        </a>
                                        <hr class="navbar-divider" />
                                        <a class="navbar-item">
                                            Report an issue
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div class="navbar-end pr-6">
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