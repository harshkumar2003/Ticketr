import React from 'react'
import Home from "./page/Home.jsx";
import Login from "./page/Login.jsx";
import Register from "./page/Register.jsx";
import {Routes, Route} from "react-router-dom";
import Dashboard from "./page/Dashboard.jsx";
function App() {


  return (
    <Routes className = "">
        <Route path={"/"} element={<Home/>}/>
        <Route path={"/login"} element={<Login/>}/>
        <Route path={"/register"} element={<Register/>}/>
        <Route path={"/dashboard"} element={<Dashboard/>}/>

    </Routes>
  )
}

export default App
