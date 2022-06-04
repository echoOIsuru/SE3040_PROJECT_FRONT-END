import React from 'react'
import { useNavigate} from "react-router-dom";
import "./interface.css";

const AdminInterface = () => {

    let navigate = useNavigate();

    return (
        <div>
            <header class="section " style={{ marginBottom: '20px' }}>
                <section class="full-width ">
                    <div className="row">

                        <br />
                        <div className="PayAdminHeading" style={{ marginBottom: "30px", marginTop: "20px" }}> <h1> ADMIN MANAGEMENT SECTION  </h1> </div>
                        <br />
                            <center>
                                <div className="adminpayRi">
                                    <button onClick={() => { navigate("/admin/upload/markingSchemes") }}> Create Marking Scheme </button>
                                </div>
                                <div className="adminPromoRi">
                                    <button onClick={() => { navigate("/admin/view/submissionTypes") }}>  Manage Submission Type </button>
                                </div>
                                <div style={{marginBottom:'10px'}} className="adminReportRi">
                                    <button onClick={() => { navigate("/admin/view/allocatedPanels") }}> Manage Panel Allocation </button>
                                </div>
                                <div className="adminpayRi">
                                    <button onClick={() => { navigate("/admin/view/supervisors") }}> Manage Supervisors </button>
                                </div>
                                <div className="adminPromoRi">
                                    <button onClick={() => { navigate("/admin/view/panelMembers") }}> Manage Panel Members </button>
                                </div>
                                <div style={{marginBottom:'10px'}} className="adminReportRi">
                                    <button onClick={() => { navigate("/admin/view/students") }}> Manage Students </button>
                                </div>
                                <div className="adminReportRi">
                                    <button onClick={() => { navigate("/admin/upload/templates") }}> Upload Documents/Templates </button>
                                </div>
                            </center>

                    </div>
                </section>
            </header>
        </div>
    )
}
export default AdminInterface;