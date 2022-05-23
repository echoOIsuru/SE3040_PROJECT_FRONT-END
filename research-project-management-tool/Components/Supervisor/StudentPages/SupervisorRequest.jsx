import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SupervisorRequest() {

    const navigate = useNavigate();

    const [intrestField, setInterestFields] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        setInterestFields([{
            field: "gg1"
        }, {
            field: "gg2"
        }, {
            field: "gg3"
        },
        ])

        setSupervisors([
            {
                supervisorName: "supervisor1",
            }, {
                supervisorName: "supervisor2"
            }
        ])

    }, [])

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name == "field") {
            onChangeField()
        }
        setInputs(values => ({ ...values, [name]: value }))
    }

    const onChangeField = () => {
        setSupervisors([
            {
                supervisorName: "213123",
            }, {
                supervisorName: "sup123123ervisor2"
            }
        ])
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(inputs)
        //navigate("")
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
                            <input type="text" name="s_name" className='form-control' onChange={handleOnChange} />
                            <br />
                            <label className="form-label">Email address</label>
                            <input type="email" name="s_email" className='form-control' onChange={handleOnChange} />
                            <br />
                            <label className="form-label">Mobile</label>
                            <input type="text" name="s_mobile" className='form-control' onChange={handleOnChange} />
                            <br />
                            <label className="form-label">Interest Field</label>
                            <select className="form-control form-control-sm" name="field" onChange={handleOnChange} required>
                                <option defaultChecked={true} className="text-center">----------- Select------------</option>
                                {intrestField.map((field, index) => {
                                    return (
                                        <option key={index}>{field.field}</option>
                                    )
                                })}
                            </select>
                            <br />
                            <label className="form-label">Supervisors</label>
                            <select className="form-control form-control-sm" name="supervisor" onChange={handleOnChange} required >
                                <option defaultChecked={true} className="text-center">----------- Select------------</option>
                                {supervisors.map((supervisor, index) => {
                                    return (
                                        <option key={index}>{supervisor.supervisorName}</option>
                                    )
                                })}
                            </select>
                            <br />

                            <label className="form-label">Topic</label>
                            <input type="text" name="topic" className='form-control' onChange={handleOnChange} />
                            <br />

                            <div className="mb-3">
                                <label className="form-label">Topic details</label>
                                <textarea className="form-control" rows="3" name="topic_details" onChange={handleOnChange}></textarea>
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