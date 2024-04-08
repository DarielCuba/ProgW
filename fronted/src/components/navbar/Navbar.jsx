import React from 'react';
import "./Navbar.css";
import { FaBookOpen } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import {Link } from "react-router-dom";
import { useSelector} from "react-redux";

const Navbar = () => {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
   
    return ( <div><nav className="navbar navbar-expand-lg ">
    <div className="container">
        <Link className="navbar-brand" to="/tareas">
            <FaBook />Tareas
            </Link>
            {!isLoggedIn && <> <li className="nav-item mx-2">
                <Link className="nav-link active btn-nav" aria-current="page" to="/signup">
                    Registrarse
                </Link>
            </li>
            <li className="nav-item mx-2">
                <Link className="nav-link active btn-nav" aria-current="page" to="/signin">
                    Iniciar Sesión
                </Link>
            </li></>}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2">
                <Link className="nav-link active" aria-current="page" to="/Home">
               <FaBookOpen /> Home
                </Link>
            </li>
            
            
           
            
            
            
           
        </ul>
       
        </div>
    </div>
    </nav></div>
  );
};

export default Navbar;