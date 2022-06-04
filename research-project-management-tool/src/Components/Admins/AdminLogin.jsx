import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLogin() {
    const navigate = useNavigate();
    const [values, setValues] = useState({})

    const handleOnChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setValues(val => ({ ...val, [name]: value }))
    }

    const AdminLogin = (e) => {
        e.preventDefault()   
        console.log("kk",values)
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
        <div className="container">
            <div className="row justify-content-md-center" style={{ marginTop: "50px", marginBottom: "100px" }}>
                <h1 className="text-center">Admin Login</h1>
                <br /><br /><br />
                <div className='col-md-5'>
                    <form className='form-control' onSubmit={AdminLogin}>
                        <label className="form-label">User Name</label>
                        <input type="username" name="admin_username" className='form-control' onChange={handleOnChange} required />
                        <br />
                        <label className="form-label">Password</label>
                        <input type="password" name="admin_password" className='form-control' onChange={handleOnChange} required />
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

export default AdminLogin;