import "./signin.css";
import React from "react";
import { useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from"axios";
import { useDispatch } from "react-redux";
import {authActions} from "../../store";

const SignIn = () => {
    const dispatch = useDispatch()
    const history = useNavigate();

    const [Inputs, setInputs] = useState({
        email: "",
        
        password: "",
    })
    const change = (e) => {
        const { name, value} = e.target;
        setInputs({...Inputs, [name]: value});
    };
    
    const submit = async(e) => {
        e.preventDefault();
        await axios
        .post("http://localhost:1000/api/v1/signin", Inputs)
        .then((response) => {
           sessionStorage.setItem("id", response.data.others._id);
           dispatch(authActions.login());
        history("/tareas");
        });  

    };
    return (
        <div>
            <div className="signup">
                <div className="container">
                    <div className="row">
                        
                       
                        </div>
                    <div >
                        <div className="d-flex flex-column w-100 p-5">
                            <input className="p-2 my-3 input-signup" 
                            type="email" 
                            name="email" 
                            placeholder="usuario"
                            value={Inputs.email}
                            onChange={change}
                            />
                            <input className="p-2 my-3 input-signup" 
                            type="password" 
                            name = "password" 
                            placeholder="contraseña"
                            value={Inputs.password}
                            onChange={change}
                            />
                    <button className="btn-signup p-2" onClick={submit}
                    >iniciar</button>
                    <div className="col-lg-4 column col-left d-flex justify-content-center align-items-center">
                    
                    </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;