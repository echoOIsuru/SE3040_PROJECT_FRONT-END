import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SupervisorServices from "../../../src/Services/Supervisors/SupervisorServices";

export default function CoSupervisorRequest() {

    const navigate = useNavigate();

    const [intrestField, setInterestFields] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
    const [inputs, setInputs] = useState({});
    const [groups, setGroups] = useState([]);
    const [supervisorID, setSupervisorID] = useState("");
    const [status, setStatus] = useState("")

    useEffect(() => {

        const student = JSON.parse(sessionStorage.getItem("STUDENT_DATA"))
        //console.log("STUDENT", student)

        SupervisorServices.getGroupByStudentNIC(student[0].nic).then(res => {
            console.log(res.data, "FINAL_GROUP")

            SupervisorServices.getTopicRequestByGroupRecordID(res.data._id).then(res2 => {
                console.log(res2.data, "Registration request")

                setInterestFields([{
                    field: res2.data.field
                }])

                setSupervisorID(res2.data.supervisor)

                setStatus(res2.data.s_status);
            })

            // setGroups({
            //     group_id: res.data.group_name,
            //     group_name: res.data.group_name,
            //     leader: res.data.leader,
            //     member1: res.data.member1,
            //     member2: res.data.member2,
            //     member3: res.data.member3,
            //     supervisor_id: " ",
            //     chat_id: "chatid00222"
            // })
            const temp = [res.data,]
            setGroups(temp)

        })


    }, [])

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name == "field") {
            onChangeField(value)
        }
        setInputs(values => ({ ...values, [name]: value }))
    }

    const onChangeField = (val) => {
        console.log(val, "SDIOUHSOD")

        SupervisorServices.getSupervisorByField(val).then(res => {
            //console.log("RES", res.data)
            setSupervisors(res.data)
        })

        SupervisorServices.getTopicRequestBySupervisor(supervisorID).then(res => {
            console.log(res.data, "REQEST DATA")
        })
    }

    const onClickGroup = (data) => {
        let temp = inputs;
        temp.s_group = data
        setInputs(temp)
    }

    const onSubmit = (e) => {
        e.preventDefault();


        if (!inputs.s_group || !inputs.field || !inputs.supervisor || inputs.field == "fail" || inputs.supervisor == "fail")
            window.alert("please fill the form correctly")
        else {
            SupervisorServices.createTopicRequest(inputs).then(res => {
                console.log(res.data, "FINAL")
                window.alert("Request Successfully Added");
                //navigate("")
            })

            //console.log(inputs)
        }
    }

    return (
        <>
            {status == "Accepted" &&
                <div className="container" style={{ marginTop: "20px", marginBottom: "50px" }}>
                    <div className="row">
                        <h1 className="text-center text-success">Supervisor accepted you topic request</h1>

                        <h3 className="text-center">Requests Co-Supervisor</h3>
                    </div>
                    <div className="row">
                        <div className="row" style={{ marginBottom: "20px", marginTop: "20px" }}>
                            <h3 className="text-center">Fill the form given below</h3>
                        </div>
                        <div className="row justify-content-md-center">
                            <div className='col-md-5'>
                                <form className='form-control' onSubmit={onSubmit}>
                                    <label className="form-label">Name</label>
                                    <input type="text" name="student_name" className='form-control' onChange={handleOnChange} required />
                                    <br />
                                    <label className="form-label">Email address</label>
                                    <input type="email" name="student_email" className='form-control' onChange={handleOnChange} required />
                                    <br />
                                    <label className="form-label">Mobile</label>
                                    <input type="text" name="student_mobile" className='form-control' onChange={handleOnChange} required />
                                    <br />

                                    <label className="form-label">Group Name</label>
                                    <div className="form-label">
                                        {groups.map((group, index) => {
                                            return (
                                                <div key={index}>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="s_group" onClick={() => onClickGroup(group)} />
                                                        <label className="form-check-label" required>
                                                            {group.group_name}
                                                        </label>
                                                    </div>
                                                </div>


                                            )
                                        })}


                                    </div>
                                    <br />


                                    <label className="form-label">Interest Field</label>
                                    <select className="form-control form-control-sm" name="field" onChange={handleOnChange} required>
                                        <option defaultChecked={true} className="text-center" value="fail">----------- Select------------</option>
                                        {intrestField.map((field, index) => {
                                            return (
                                                <option key={index}>{field.field}</option>
                                            )
                                        })}
                                    </select>
                                    <br />
                                    <label className="form-label">Co-Supervisors</label>
                                    <select className="form-control form-control-sm" name="supervisor" onChange={handleOnChange} required >
                                        <option defaultChecked={true} className="text-center" value="fail">----------- Select------------</option>
                                        {supervisors.map((supervisor, index) => {
                                            return (
                                                supervisor._id !== supervisorID
                                                && <option key={index} value={supervisor._id} >{supervisor.s_name}</option>


                                            )
                                        })}
                                    </select>
                                    <br />

                                    <label className="form-label">Topic</label>
                                    <input type="text" name="topic" className='form-control' onChange={handleOnChange} required />
                                    <br />

                                    <div className="mb-3">
                                        <label className="form-label">Topic details</label>
                                        <textarea className="form-control" rows="3" name="topic_details" onChange={handleOnChange} required></textarea>
                                    </div>
                                    <br />
                                    <center>
                                        <input type="submit" className="btn btn-dark " value="Request Topic" />
                                    </center>
                                </form>
                            </div>
                        </div>
                    </div >
                </div >
            }
            {status == "Rejected" &&
                <div>
                    <div className="container" style={{ marginTop: "150px", marginBottom: "50px" }}>
                        <div className="row">
                            <h1 className="text-center text-danger">Supervisor rejected you topic request</h1>

                            <h3 className="text-center">Please try again with different topic</h3>
                        </div>
                    </div>
                </div>
            }
            {status == "Pending" &&
                <div>
                    <div className="container" style={{ marginTop: "150px", marginBottom: "50px" }}>
                        <div className="row">
                            <h1 className="text-center text-warning">Your reqest under pending state</h1>

                            <h3 className="text-center">You can request to the co-supervisor when supervisor accept your request</h3>
                        </div>
                    </div>
                </div>
            }

        </>
    )

}