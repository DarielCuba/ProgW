import React, { useEffect, useState } from "react";
import axios from "axios";
import {  toast } from 'react-toastify';

const Update = ({ display, update }) => {
    useEffect(() => {
    setInputs({
    title: update.title,
    body: update.body,
});

}, [update]);

const [Inputs, setInputs] = useState({
    title: "",
    body: ""
    });
const change = (e) => {
        const {name, value} = e.target;
        setInputs({...Inputs, [name]: value});
    };
    const submit = async () => {
        try {
            const response = await axios.put(`http://localhost:1000/api/v2/updateTask/${update._id}`);
            toast.success('Actualizado');
            display('none');
        } catch (error) {
            console.error('Error al actualizar la tarea:', error);
            toast.error('Error al actualizar la tarea');
        }
    };


    
    return (
        <div className="p-S d-flex justify-content-center 
        align-align-items-center flex-column update">
            <h3>Actualiza tu Tarea</h3>
            <input 
            type="text" 
            className="todo-inputs my-4 w-100 p-3" 
            name= "title" 
            value={Inputs.title} 
            onChange={change}/>
            <textarea 
            className="todo-inputs w-100 p-3" 
            name= "body"
            value={Inputs.body} 
            onChange={change}/>
            <div>
                <button className="btn btn-dark my-4" onClick={submit} >
                    Actualizar</button>
                <button className="btn btn-danger my-4 mx-3" 
                onClick={() =>{
                    display("none");
                }} >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default Update;
