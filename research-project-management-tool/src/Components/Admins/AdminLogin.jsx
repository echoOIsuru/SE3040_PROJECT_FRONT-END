import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLogin() {
    const navigate = useNavigate();
    const [values, setValues] = useState({})
    const [loading, setLoding] = useState(false);

    const handleOnChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setValues(val => ({ ...val, [name]: value }))
    }

    const AdminLogin = (e) => {
        e.preventDefault()
        //setLoding(true)
        console.log("kk", values)
        axios.post("http://localhost:8090/api/v1/admin/login/validate", values).then(res => {

            if (!res.data) {
                window.alert('Please enter correct username and password')
            } else {
                navigate('/admin/interface')
            }

        }).catch(() => {
            window.alert('Try again')
        })
    }

    return (
        <div className="container" style={{ marginTop: "180px" }}>
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                        className="img-fluid" alt="Sample image" />
                </div>
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">

                    <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                        <h1 className="text-center">Admin Login</h1>
                        <br /><br /><br />
                    </div>
                    <br />
                    <form onSubmit={AdminLogin}>
                        <div className="form-outline mb-4">
                            <label className="form-label" >User Name</label><br />
                            <input name="admin_username" type="text" style={{ width: '410px' }} className='form-control' onChange={handleOnChange} required />
                        </div>


                        <div className="form-outline mb-3">
                            <label className="form-label" >Password</label><br />
                            <input name="admin_password" type="password" className='form-control' onChange={handleOnChange} required />
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

                </div>

            </div>

        </div>
    )
}

export default AdminLogin;