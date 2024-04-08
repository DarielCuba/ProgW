import React from "react";
import "./signup.css";
import { useState } from "react";
import axios from"axios";
import { useNavigate} from "react-router-dom";

const Signup = () =>{

    const history = useNavigate();

    const [Inputs, setInputs] = useState({
        email: "",
        username: "",
        password: "",
    })

    const change = (e) => {
        const { name, value} = e.target;
        setInputs({...Inputs, [name]: value});
    };
    
    const submit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:1000/api/v1/register", Inputs)
            .then((response) => {
                if (response.data.message === "Ya existe el usuario") {
                    alert(response.data.message);
                } else {
                    alert("usuario creado");
                    setInputs({
                        email: "",
                        username: "",
                        password: "",
                    });
                    history("/tareas"); // Utiliza history.push para redirigir a una nueva ruta
                }
            });
    };

    return ( <div className="signup">
        <div className="container">
            <div className="row">
                <div className=" col-lg-8 column d-flex justify-content-around align-items-center">
                    <div className="d-flex flex-column w-100 p-5">
                        <input className="p-2 my-3 input-signup" 
                            type="email" 
                            placeholder="email"
                            name="email"
                            onChange={change}
                            value={Inputs.email}
                            />
                        <input className="p-2 my-3 input-signup" 
                            type="username" 
                            placeholder="usuario"
                            name="username"
                            onChange={change}
                            value={Inputs.username}
                            />
                        <input className="p-2 my-3 input-signup" 
                            type="password" 
                            placeholder="contraseña"
                            name="password"
                            onChange={change}
                            value={Inputs.password}
                            />
                        <br/><button className="d-flex btn-signup p-2" onClick={submit}>Registrarse</button>
                    </div>
                </div>
                <div className="col-lg-8 column d-flex justify-content-center align-item-center ">
                

                </div>
            </div>

        </div>
    </div>
)};

export default Signup;