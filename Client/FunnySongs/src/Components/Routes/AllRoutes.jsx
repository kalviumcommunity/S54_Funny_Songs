import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "../HomeComponent/Home.jsx"
import SignUp from '../SignUpComponent/SignUp.jsx';
import Profile from '../ProfileComponent/Profile.jsx';
import MainComponent from '../MainComponent/MainComponent.jsx';

const AllRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/SignUp" element={<SignUp/>} />
                <Route path="/Profile" element={<Profile/>} />
                <Route path="/Main" element={<MainComponent/>} />
            </Routes>
        </div>
    )
}

export default AllRoutes