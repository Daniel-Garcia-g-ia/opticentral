import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../navbar";
import logoLogin from "../../assets/images/logoLogin.webp"
import { HiOutlineMail } from "react-icons/hi";
import { MdPassword } from "react-icons/md";



function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClickLogin = async () => {
        
        try {
            const response = await fetch ("http://localhost:3000/app/v1/loginUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({email, password}),
            });
            console.log(response.body)
            

            const data = await response.json()
            console.log(data)

        } catch (error){
            console.log("Error al iniciar sesion", error)
        } 

    }

    return (
        <>
            <nav>
                <Navbar />
            </nav>
            <div className="columns is-centered custom-container-text-login">


                <div className="column custom-title-login">
                    <span>Ingresar a </span>
                    <span className="pl-6">OptiCentral </span>

                </div>

                {/* logo */}
                <div className="column">


                    <div className="container custom-size-image">
                        <figure className="image">
                            <img className="border " src={logoLogin} />
                        </figure>
                    </div>

                </div>

                {/* form */}
                <div className="column custom-form-login">
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input" type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <span className="icon is-small is-left">
                                <HiOutlineMail size={"20"} />
                            </span>
                            <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                            </span>
                        </p>

                    </div>

                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <span className="icon is-small is-left">
                                <MdPassword size={"20"} />
                            </span>
                        </p>

                    </div>
                    <div className="custom-containe-login-buttom">
                        <button className="button custom-width-login" onClick={handleClickLogin}>
                            Ingresar
                        </button>

                        <span className="custom-recover-pass">Recuperar Contraseña ?</span>
                    </div>

                </div>


            </div>




        </>
    )
}

export default Login;