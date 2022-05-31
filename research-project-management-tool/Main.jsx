// import React from "react";
// import Admin from "./Components/Admins/Admin";
// import PanelMembers from "./Components/PanelMembers/PanelMember";
// import Student from "./Components/Students/Student";
// import Supervisor from "./Components/Supervisor/Supervisor";
import {
   BrowserRouter,
   Routes,
   Route,
 } from "react-router-dom";


import AddStudent from "./Components/Students/addStudent";
import AllStudent from "./Components/Students/Allstudents";
import Download from "./Components/Students/download";
import AddGroup from "./Components/Students/groupRegistration";
import Login from "./Components/Students/login";
import Submition from "./Components/Students/submition";
import Upload from "./Components/Students/upload";
import Allfiles from "./Components/Students/viewfile";
import ViewTopicRequest from "./Components/Students/viewTopicRequest";
import ViewGroup from "./Components/Students/view_group_details";
import Allsubmition from "./Components/Students/view_Submition";

const Main = () => {
   return (
         <Routes>
            {/* <Route path="/" element={<h1>Home</h1>}/>
            <Route path="/admins" element={<Admin/>}/>
            <Route path="/panelMember" element={<PanelMembers/>}/>
            <Route path="/students" element={<Student/>}/>
            <Route path="/supervisors" element={<Supervisor/>}/>
            <Route path="/panelMember2" element={<PanelMembers/>}/> */}

         
           <Route path="/add" element={<AddStudent/>}/>
           <Route path="/student_home" element={<AllStudent/>}/>
           <Route path="/" element={<Login/>}/>
      
           <Route path="/viewtopic" element={<ViewTopicRequest/>}/>
           <Route path="/group" element={<AddGroup/>}/>
           <Route path="/view_group" element={<ViewGroup/>}/>
           <Route path="/upload" element={<Upload/>}/>
           <Route path="/view_upload" element={<Allfiles/>}/>
           <Route path="/d" element={<Download/>}/>
           <Route path="/submition" element={<Submition/>}/>
           <Route path="/view_submition" element={<Allsubmition/>}/>
         </Routes>
   )
}

export default Main;