import React from 'react';
import Navbar from './components/navbar/Navbar';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/home/home';
import Signup from "./components/signup/signup";
import SignIn from "./components/signup/signin";
import Tareas from './components/tarea/Tareas';
import { useDispatch } from "react-redux";
import {authActions} from "./store";
import { useEffect } from 'react';


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if(id){
      dispatch(authActions.login());
    }
  }, [dispatch]);
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/tareas" element={<Tareas />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  );
};


export default App;