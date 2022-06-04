import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SupervisorServices from "../../../Services/Supervisors/SupervisorServices";

export default function SupervisorRequest() {

    const navigate = useNavigate();

    const [intrestField, setInterestFields] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
    const [inputs, setInputs] = useState({});
    const [groups, setGroups] = useState([])

    useEffect(() => {
        setInterestFields([{
            field: "Internet of Things"
        }, {
            field: "Cloud Computing"
        }, {
            field: "Big Data Analytics"
        }, {
            field: "Machine Learning"
        }, {
            field: "Artificial Intelligence"
        },
        ])

        SupervisorServices.getAllGroups().then(res => {
            setGroups(res.data)
        })

        // setSupervisors([
        //     {
        //         supervisorName: "supervisor1",
        //     }, {
        //         supervisorName: "supervisor2"
        //     }
        // ])

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
                navigate("/supervisors/co-supervisor/student-requests")
            })

            //console.log(inputs)
        }
    }

    return (
        <div className="container" style={{ marginTop: "20px", marginBottom: "50px" }}>
            <div className="row">
                <h1 className="text-center">Requests Supervisor</h1>
            </div>
            <div className="row">
                <div className="row" style={{ marginBottom: "20px", marginTop: "20px" }}>
                    <h2 className="text-center">Fill the form given below</h2>
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
                            <div className="form-label" style={{
                                height: "200px",
                                overflowY: "scroll",
                                overflowX: "hidden"
                            }}>
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
                            <label className="form-label">Supervisors</label>
                            <select className="form-control form-control-sm" name="supervisor" onChange={handleOnChange} required >
                                <option defaultChecked={true} className="text-center" value="fail">----------- Select------------</option>
                                {supervisors.map((supervisor, index) => {
                                    return (

                                        <option key={index} value={supervisor._id} >{supervisor.s_name}</option>

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
    )

}