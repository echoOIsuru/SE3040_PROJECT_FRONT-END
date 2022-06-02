import React from "react";
import Admin from "./Components/Admins/CreateSubmissionTypes";
import PanelMembers from "./Components/PanelMembers/PanelMember";
import Student from "./Components/Students/Student";
import Supervisor from "./Components/Supervisor/Supervisor";
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

const Main = () => {
   return (
         <Routes>
            <Route path="/" element={<h1>Home</h1>}/>
            <Route path="/panelMember" element={<PanelMembers/>}/>
            <Route path="/students" element={<Student/>}/>
            <Route path="/supervisors" element={<Supervisor/>}/>
            <Route path="/panelMember2" element={<PanelMembers/>}/>

            <Route path="/admin/interface" element={<AdminInterface/>}/>
            <Route path="/admin/create/submissionTypes" element={<CreateSubmissionTypes/>}/>
            <Route path="/admin/upload/templates" element={<DocsUploadHandler/>}/>
            <Route path="/admin/upload/markingSchemes" element={<MarkingSchemes/>}/>
            <Route path="/admin/view/students" element={<Liststudents/>}/>
            <Route path="/admin/student/edit/:id" element={<UpdateStudents/>}/>
            <Route path="/admin/panelAllocation/create" element={<PanelAllocation/>}/>
            <Route path="/admin/allocatedPanel/edit/:id" element={<PanelAllocation/>}/>
            <Route path="/admin/view/allocatedPanels" element={<ListAllocatedPanels/>}/>
            <Route path="/admin/view/supervisors" element={<ListSupervisor/>}/>
            <Route path="/admin/supervisor/edit/:id" element={<UpdateSupervisor/>}/>
            <Route path="/admin/view/panelMembers" element={<ListPanelMembers/>}/>
            <Route path="/admin/panelMembers/edit/:id" element={<UpdatePanelMember/>}/>

            {/* <Route path="/admin/staff/edit/:id" element={<CreateSubmissionTypes/>}/>
            <Route path="/admin/view/staff" element={<CreateSubmissionTypes/>}/>
             */}

         </Routes>
   )
}

export default Main;