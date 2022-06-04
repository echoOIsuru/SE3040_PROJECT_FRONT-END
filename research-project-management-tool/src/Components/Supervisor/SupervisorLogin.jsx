import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SupervisorServices from '../../Services/Supervisors/SupervisorServices';

function SupervisorLogin() {
    const navigate = useNavigate();
    const [values, setValues] = useState({})
    const [loading, setLoding] = useState(false);

    const handleOnChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setValues(val => ({ ...val, [name]: value }))
    }

    const loginSupervisor = (e) => {
        e.preventDefault()
        setLoding(true)
        SupervisorServices.validateSupervisor(values).then(res => {

            if (!res.data) {
                window.alert('Please enter correct email and password')
            } else {
                sessionStorage.setItem('SUPERVISOR', JSON.stringify(res.data))
                navigate('/supervisors')
            }
            setLoding(false)

        }).catch(() => {
            window.alert('Try again')
        })
    }

    return (
        <div className="container" style={{ marginTop: "180px" }}>
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        className="img-fluid" alt="Sample image" />
                </div>
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">

                    <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                        <h1 className="text-center">Supervisor Login</h1>
                        <br /><br /><br />
                    </div>
                    <br />
                    <form onSubmit={loginSupervisor}>
                        <div className="form-outline mb-4">
                            <input type="email" name="s_email" className='form-control' onChange={handleOnChange} required />
                            <label className="form-label" >Email address</label>
                        </div>


                        <div className="form-outline mb-3">
                            <input type="password" name="password" className='form-control' onChange={handleOnChange} required />
                            <label className="form-label" >Password</label>
                        </div>

                        <div className="text-center text-lg-start mt-4 pt-2">

                            {loading &&
                                <button type="submit" className="btn btn-primary btn-lg"
                                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }} >
                                    {loading && (
                                        <i
                                            className="fa fa-refresh fa-spin"
                                            style={{ marginRight: "5px" }}
                                        />
                                    )}

                                    Loading...
                                </button>
                            }

                            {!loading && <input type="submit" className="btn btn-primary btn-lg" value="Login"
                                style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }} />}



                        </div>

                    </form>
                    <div className="text-center text-lg-start mt-4 pt-2">
                        <p className="small fw-bold mt-2 pt-1 mb-0">Register as Supervisor <a href="/supervisors/register"
                            className="link-danger">Register</a></p>
                    </div>


                </div>

            </div>

        </div>

    )
}

export default SupervisorLogin