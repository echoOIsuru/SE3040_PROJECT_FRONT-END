import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PanelMemberServices from "../../Services/PanelMembers/PanelMemberServices";

export default function PanelMemberProfile () {

    const [inputs, setInputs] = useState([]);

    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);

        PanelMemberServices.validateLogin(inputs)
            .then((data) => {
                 if(!data.data){
                     window.alert("Please enter valid credentials")
                 }else{
                    const data = JSON.stringify(inputs);
                    sessionStorage.setItem('LOGIN_DATA', data);

                    navigate('/viewPanel');
                 }
            })

    }

    return (
        <>
            <br /><br /><br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <br />
                        <h1 className="text-center">Panel Member Login</h1>
                        <br />
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Username : </label>
                                    <input type="text" name="username" value={inputs.username || ""} onChange={handleChange} className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label>Password : </label>
                                    <input type="password" name="password" value={inputs.password || ""}  onChange={handleChange} className="form-control" required />
                                </div>

                                <br />
                                <div className="text-center">
                                    <input type="submit" value="Login" className="btn btn-success" />
                                </div>
                            </form>
                            <div className="text-end">
                                <Link to="/panelMemberReg">Create New Account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}