import React from "react";
import {
   BrowserRouter,
   Routes,
   Route,
} from "react-router-dom";
import Admin from "./Components/Admins/Admin";
import PanelMembers from "./Components/PanelMembers/PanelMember";

import Supervisor from "./Components/Supervisor/Supervisor";
import GroupChat from './Components/Supervisor/GroupChat';
import SupervisorRegister from "./Components/Supervisor/SupervisorRegister";
import SupervisorRequest from "./Components/Supervisor/StudentPages/SupervisorRequest";
import SupervisorDocumentEvaluation from "./Components/Supervisor/SupervisorDocumentEvaluation";
import SupervisorLogin from "./Components/Supervisor/SupervisorLogin";
import GroupChatStudent from "./Components/Supervisor/StudentPages/GroupChatStudent";
import SupervisorFeedback from "./Components/Supervisor/SupervisorFeedback";


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
import CoSupervisorRequest from "./Components/Supervisor/StudentPages/CoSupervisorRequest";
import Navbar from "./Nav/Navbar";
import Footer from "./Nav/Footer";

const Main = () => {
   return (
      <>

         <Routes>
            <Route path="/add" element={<AddStudent />} />
            <Route path="/student_home" element={<><Navbar /><AllStudent /></>} />
            <Route path="/" element={<Login />} />

            <Route path="/viewtopic" element={<><Navbar /><ViewTopicRequest /></>} />
            <Route path="/group" element={<><Navbar /><AddGroup /></>} />
            <Route path="/view_group" element={<><Navbar /><ViewGroup /></>} />
            <Route path="/upload" element={<><Navbar /><Upload /></>} />
            <Route path="/view_upload" element={<><Navbar /><Allfiles /></>} />
            <Route path="/d" element={<><Navbar /><Download /></>} />
            <Route path="/submition" element={<><Navbar /><Submition /></>} />
            <Route path="/view_submition" element={<><Navbar /><Allsubmition /></>} />



            <Route path="/admins" element={<><Navbar /><Admin /></>} />
            <Route path="/panelMember" element={<><Navbar /><PanelMembers /></>} />

            <Route path="/panelMember2" element={<PanelMembers />} />
            <Route path="/supervisors" element={<><Navbar /><Supervisor /></>} />
            <Route path="/supervisors/register" element={<><Navbar /><SupervisorRegister /></>} />
            <Route path="/supervisors/login" element={<><SupervisorLogin /></>} />
            <Route path="/supervisors/chats" element={<><Navbar /><GroupChat /></>} />
            <Route path="/supervisors/student/chats" element={<><Navbar /><GroupChatStudent /></>} />
            <Route path="/supervisors/student-requests" element={<><Navbar /><SupervisorRequest /></>} />
            <Route path="/supervisors/co-supervisor/student-requests" element={<><Navbar /><CoSupervisorRequest /></>} />
            <Route path="/supervisors/document-evaluations" element={<><Navbar /><SupervisorDocumentEvaluation /></>} />
            <Route path="/supervisors/document-feedbacks" element={<><Navbar /><SupervisorFeedback /></>} />
         </Routes>

         <Footer />
      </>
   )
}

export default Main;