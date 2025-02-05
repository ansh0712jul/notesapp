
import Home from "@/pages/Home";

import Project from "@/pages/Project";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";


const AppRoutes = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/sign-up" element = { <SignUp/> }/>
            <Route path="/sign-in" element = { <SignIn/> }/>
            <Route path="/" element={<Home/>}/>
            <Route path="/project" element={<Project/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes