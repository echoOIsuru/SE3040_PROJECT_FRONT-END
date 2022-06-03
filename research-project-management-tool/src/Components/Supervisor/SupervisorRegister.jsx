import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SupervisorServices from '../../Services/Supervisors/SupervisorServices';
import ResearchFields from './SupervisorComponents/ResearchFields'

function SupervisorRegister() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [data, setData] = useState([
        {
            fieldName: "ggwp"
        },
        {
            fieldName: "ggwp2"
        },
        {
            fieldName: "ggwp3"
        },
        {
            fieldName: "ggwp4"
        },
    ])

    const [selected, setSelected] = useState({})

    const createSupervisor = (e) => {
        e.preventDefault()
        let obj = inputs
        obj.selected = selected

        console.log(selected)

        if (obj.password != obj.re_password) {
            window.alert("Password and re enter password missmatched")
        } else if (selected.length == 0) {
            window.alert("Please select intrested field")
        } else {
            //console.log(obj, "FINAL")

            SupervisorServices.createSupervisor(obj).then(res => {
                sessionStorage.setItem("SUPERVISOR", JSON.stringify(res.data))
                navigate('/supervisors')
            })


        }

    }

    const handleOnChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleFiled = (event) => {
        setSelected(event)
    }

    return (
        <div className="container">
            <div className="row justify-content-md-center" style={{ marginTop: "50px", marginBottom: "100px" }}>
                <h1 className="text-center">Supervisor Registration Form</h1>
                <br /><br /><br />
                <div className='col-md-5'>
                    <form className='form-control' onSubmit={createSupervisor}>
                        <label className="form-label">Name</label>
                        <input type="text" name="s_name" className='form-control' onChange={handleOnChange} required />
                        <br />
                        <label className="form-label">Email address</label>
                        <input type="email" name="s_email" className='form-control' onChange={handleOnChange} required />
                        <br />
                        <label className="form-label">Mobile</label>
                        <input type="text" name="s_mobile" className='form-control' onChange={handleOnChange} required />
                        <br />
                        <label className="form-label">Research Interested Field</label>
                        <ResearchFields data={data} handleOnChange={handleFiled} />

                        {/* <input type="submit" value="Register"/> */}

                        <label className="form-label">Password</label>
                        <input type="password" name="password" className='form-control' onChange={handleOnChange} required />
                        <br />

                        <label className="form-label">Re Enter Password</label>
                        <input type="password" name="re_password" className='form-control' onChange={handleOnChange} required />
                        <br />
                        <center>
                            <input type="submit" value="Register" className="btn btn-dark " />
                        </center>
                    </form>
                </div>
            </div>
        </div>




    )
}

export default SupervisorRegister