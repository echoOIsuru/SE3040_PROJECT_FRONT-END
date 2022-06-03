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

import PanelMemberRegister from "./Components/PanelMembers/PanelMemberRegister";
import ViewPanel from "./Components/PanelMembers/ViewPanel";
import TopicFeedback from "./Components/PanelMembers/TopicFeedback";
import PptFeedback from "./Components/PanelMembers/PptFeedback";

const Main = () => {
   return (
      <Routes>


         <Route path="/add" element={<AddStudent />} />
         <Route path="/student_home" element={<AllStudent />} />
         <Route path="/" element={<Login />} />

         <Route path="/viewtopic" element={<ViewTopicRequest />} />
         <Route path="/group" element={<AddGroup />} />
         <Route path="/view_group" element={<ViewGroup />} />
         <Route path="/upload" element={<Upload />} />
         <Route path="/view_upload" element={<Allfiles />} />
         <Route path="/d" element={<Download />} />
         <Route path="/submition" element={<Submition />} />
         <Route path="/view_submition" element={<Allsubmition />} />



         <Route path="/admins" element={<Admin />} />
         <Route path="/panelMember" element={<PanelMembers />} />

         <Route path="/panelMember2" element={<PanelMembers />} />
         <Route path="/supervisors" element={<Supervisor />} />
         <Route path="/supervisors/register" element={<SupervisorRegister />} />
         <Route path="/supervisors/login" element={<SupervisorLogin />} />
         <Route path="/supervisors/chats" element={<GroupChat />} />
         <Route path="/supervisors/student/chats" element={<GroupChatStudent />} />
         <Route path="/supervisors/student-requests" element={<SupervisorRequest />} />
         <Route path="/supervisors/co-supervisor/student-requests" element={<CoSupervisorRequest />} />
         <Route path="/supervisors/document-evaluations" element={<SupervisorDocumentEvaluation />} />
         <Route path="/supervisors/document-feedbacks" element={<SupervisorFeedback />} />



         <Route path="/panelMember" element={<PanelMembers/>}/>
         <Route path="/panelMemberReg" element={<PanelMemberRegister/>}/>
         <Route path="/viewPanel" element={<ViewPanel/>}/>
         <Route path="/topic-feedback" element={<TopicFeedback/>}/>
         <Route path="/ppt-feedback" element={<PptFeedback/>}/>

      </Routes>
   )
}

export default Main;