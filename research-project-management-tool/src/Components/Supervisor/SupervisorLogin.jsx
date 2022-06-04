import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SupervisorServices from '../../Services/Supervisors/SupervisorServices';

function SupervisorLogin() {
    const navigate = useNavigate();
    const [values, setValues] = useState({})

    const handleOnChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setValues(val => ({ ...val, [name]: value }))
    }

    const loginSupervisor = (e) => {
        e.preventDefault()
        SupervisorServices.validateSupervisor(values).then(res => {

            if (!res.data) {
                window.alert('Please enter correct email and password')
            } else {
                sessionStorage.setItem('SUPERVISOR', JSON.stringify(res.data))
                navigate('/supervisors')
            }


        }).catch(() => {
            window.alert('Try again')
        })
    }

    return (
        <div className="container">
            <div className="row justify-content-md-center" style={{ marginTop: "50px", marginBottom: "100px" }}>
                <h1 className="text-center">Supervisor Login</h1>
                <br /><br /><br />
                <div className='col-md-5'>
                    <form className='form-control' onSubmit={loginSupervisor}>
                        <label className="form-label">Email address</label>
                        <input type="email" name="s_email" className='form-control' onChange={handleOnChange} required />
                        <br />
                        <label className="form-label">Password</label>
                        <input type="password" name="password" className='form-control' onChange={handleOnChange} required />
                        <br />
                        <center>
                            <input type="submit" value="Login" className="btn btn-dark " />
                        </center>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default SupervisorLogin