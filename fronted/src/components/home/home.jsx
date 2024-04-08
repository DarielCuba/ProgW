import React from 'react';
import "./home.css";


const Home = () => {
    return (
    <div className='home d-flex justify-content-center align-items-center'>
        <div className='container d-flex justify-content-center align-items-center flex-column'>
        <h1 className='text-center'>
            Organiza tu <br /> estudio y trabajo.
        </h1>
        <p>Mejora la productividad con la gestion de tareas
        </p>
        <button class="home-btn p-2">Crea una Tarea</button>
        </div>
      
    </div>
    );
  };
  
  export default Home;