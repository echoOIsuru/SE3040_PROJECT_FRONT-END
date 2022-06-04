import React from "react";
import {
   BrowserRouter,
   Routes,
   Route,
} from "react-router-dom";

import CreateSubmissionTypes from "./Components/Admins/CreateSubmissionTypes";
import DocsUploadHandler from "./Components/Admins/DocsUploadHandler";
import MarkingSchemes from "./Components/Admins/CreateMarkingSchemes";
import Liststudents from "./Components/Admins/ListStudents";
import UpdateStudents from "./Components/Admins/UpdateStudents";
import PanelAllocation from "./Components/Admins/PanelAllocation";
import ListSupervisor from "./Components/Admins/ListSupervisor";
import UpdateSupervisor from "./Components/Admins/UpdateSupervisor";
import ListPanelMembers from "./Components/Admins/ListPanelMembers";
import UpdatePanelMember from "./Components/Admins/UpdatePanelMembers";
import AdminInterface from './Components/Admins/AdminInterfaces';
import ListAllocatedPanels from "./Components/Admins/ListAllocatedPanels";

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
import AdminLogin from "./Components/Admins/AdminLogin";
import ListSubmissionTypes from "./Components/Admins/ListSubmissionTypes";
import UpdateSubmissionTypes from "./Components/Admins/UpdateSubmssionTypes";

const Main = () => {
   return (
      <Routes>

         <Route path="/admin/login" element={<AdminLogin />} />
         <Route path="/admin/interface" element={<AdminInterface />} />
         <Route path="/admin/create/submissionTypes" element={<CreateSubmissionTypes />} />
         <Route path="/admin/upload/templates" element={<DocsUploadHandler />} />
         <Route path="/admin/upload/markingSchemes" element={<MarkingSchemes />} />
         <Route path="/admin/view/students" element={<Liststudents />} />
         <Route path="/admin/student/edit/:id" element={<UpdateStudents />} />
         <Route path="/admin/panelAllocation/create" element={<PanelAllocation />} />
         <Route path="/admin/allocatedPanel/edit/:id" element={<PanelAllocation />} />
         <Route path="/admin/view/allocatedPanels" element={<ListAllocatedPanels />} />
         <Route path="/admin/view/supervisors" element={<ListSupervisor />} />
         <Route path="/admin/supervisor/edit/:id" element={<UpdateSupervisor />} />
         <Route path="/admin/view/panelMembers" element={<ListPanelMembers />} />
         <Route path="/admin/panelMembers/edit/:id" element={<UpdatePanelMember />} />
         <Route path="/admin/view/submissionTypes" element={<ListSubmissionTypes />} />
         <Route path="/admin/submissionTypes/edit/:id" element={<UpdateSubmissionTypes />} />

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
      </Routes>

   )
}

export default Main;