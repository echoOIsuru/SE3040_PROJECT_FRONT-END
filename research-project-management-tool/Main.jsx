import React from "react";
import {
   BrowserRouter,
   Routes,
   Route,
} from "react-router-dom";
import Admin from "./Components/Admins/Admin";
import PanelMembers from "./Components/PanelMembers/PanelMember";
import Student from "./Components/Students/Student";
import Supervisor from "./Components/Supervisor/Supervisor";
import GroupChat from './Components/Supervisor/GroupChat';
import SupervisorRegister from "./Components/Supervisor/SupervisorRegister";
import SupervisorRequest from "./Components/Supervisor/StudentPages/SupervisorRequest";
import SupervisorDocumentEvaluation from "./Components/Supervisor/SupervisorDocumentEvaluation";

const Main = () => {
   return (
      <Routes>
         <Route path="/" element={<h1>Home</h1>} />
         <Route path="/admins" element={<Admin />} />
         <Route path="/panelMember" element={<PanelMembers />} />
         <Route path="/students" element={<Student />} />
         <Route path="/panelMember2" element={<PanelMembers />} />
         <Route path="/supervisors" element={<Supervisor />} />
         <Route path="/supervisors/register" element={<SupervisorRegister />} />
         <Route path="/supervisors/chats" element={<GroupChat />} />
         <Route path="/supervisors/student-requests" element={<SupervisorRequest />} />
         <Route path="/supervisors/document-evaluations" element={<SupervisorDocumentEvaluation />} />
      </Routes>
   )
}

export default Main;