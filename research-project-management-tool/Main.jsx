import React from "react";
import Admin from "./Components/Admins/Admin";
import PanelMembers from "./Components/PanelMembers/PanelMember";
import Student from "./Components/Students/Student";
import Supervisor from "./Components/Supervisor/Supervisor";
import {
   BrowserRouter,
   Routes,
   Route,
 } from "react-router-dom";
import PanelMemberRegister from "./Components/PanelMembers/PanelMemberRegister";

const Main = () => {
   return (
         <Routes>
            <Route path="/" element={<h1>Home</h1>}/>
            <Route path="/admins" element={<Admin/>}/>
            <Route path="/panelMember" element={<PanelMembers/>}/>
            <Route path="/students" element={<Student/>}/>
            <Route path="/supervisors" element={<Supervisor/>}/>
            <Route path="/panelMemberReg" element={<PanelMemberRegister/>}/>
         </Routes>
   )
}

export default Main;