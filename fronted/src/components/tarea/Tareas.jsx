import React, { useEffect, useState } from "react";
import "./Tareas.css";
import TodoCards from "./TodoCards";
import Update from "./Update";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";



const Tarea = () => {
    const [Inputs, setInputs] = useState({ title: "", body: "" });
    const [todoList, setTodoList] = useState([]);
    const [id, setId] = useState(null);
    let todoUpdateArray = [];

    const show = () => {
        document.getElementById("textarea").style.display = "block";
    };

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    };

    const submit = async () => {
        if (Inputs.title === "" || Inputs.body === "") {
            toast.error("El título o la descripción no puede ser vacía");
        } else {
            if (id) {
                await axios
                    .post("http://localhost:1000/api/v2/addTask", {
                        title: Inputs.title,
                        body: Inputs.body,
                        id: id,
                    })
                    .then((response) => {
                        console.log(response);
                    });

                setInputs({ title: "", body: "" });
                toast.success("La tarea se ha añadido");
            } else {
                setTodoList([...todoList, Inputs]);
                setInputs({ title: "", body: "" });
                toast.success("La tarea se ha añadido");
                toast.success("La tarea no se ha guardado. Inicia sesión");
            }
        }
    };

    useEffect(() => {
        if (id) {
            const fetch = async () => {
                await axios
                    .get(`http://localhost:1000/api/v2/getTask/${id}`)
                    .then((response) => {
                        setTodoList(response.data.list);
                    });
            };
            fetch();
        }
    }, [submit]);

    const dis = (value) => {
        document.getElementById("todo-update").style.display = value;
    };

    const update = (value) => {
        todoUpdateArray = todoList.find(todo => todo.id === value);
    };

    const del = async (Cardid) => {
        if (id) {
            try {
                const response = await axios.delete(`http://localhost:1000/api/v2/deleteTask/${Cardid}`, {
                    data: { id: id }
                });

                if (response.status === 200) {
                    setTodoList(todoList.filter(todo => todo.id !== Cardid));
                    toast.success("Tarea eliminada correctamente");
                } else {
                    toast.error("Error al eliminar la tarea");
                }
            } catch (error) {
                console.error("Error al eliminar la tarea:", error);
                toast.error("Ocurrió un error al intentar eliminar la tarea");
            }
        } else {
            toast.error("Debes iniciar sesión para eliminar la tarea");
        }
    };

    return (
        <>
            <div className="todo">
                <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
                    <div className="todo-inputs-div d-flex flex-column w-50 p-1">

                        <input
                            type="text"
                            placeholder="TITLE"
                            className="todo-inputs my-2 p-2"
                            onClick={show}
                            name="title"
                            value={Inputs.title}
                            onChange={change}
                        />
                        <textarea
                            id="textarea"
                            type="text"
                            placeholder="BODY"
                            name="body"
                            className="p-2 todo-inputs"
                            value={Inputs.body}
                            onChange={change}
                        />
                    </div>
                    <div className="w-50 d-flex justify-content-end my-3">
                        <button className="home-btn px-2 py-1" onClick={submit}> Add </button>
                    </div>
                </div>
                <div className="todo-body">
                    <div className="container-fluid">
                        <div className="row">
                            {todoList.map((todo) => (
                                <div key={todo.id} className="p-3 todo-card">
                                    <div>
                                        <h5>{todo.title}</h5>
                                        <p className="todo-card-p">{todo.body.slice(0, 77)}...</p>
                                    </div>
                                    <div className="d-flex justify-content-around">
                                        <div
                                            className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1"
                                            onClick={() => {
                                                dis("block");
                                                update(todo.id);
                                            }}
                                        >
                                            <GrDocumentUpdate className="card-icons" /> Actualizar
                                        </div>
                                        <div
                                            className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1 text-danger"
                                            onClick={() => {
                                                del(todo.id);
                                            }}
                                        >
                                            <AiFillDelete className="card-icons del" /> Eliminar
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="todo-update" id="todo-update">
                <div className="container update">
                    <Update display={dis} update={todoUpdateArray} />
                </div>
            </div>
        </>
    );
};

export default Tarea;
