import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PanelMemberServices from "../../temp/PanelMemberServices";

export default function PanelMemberRegister(){

    const [inputs, setInputs] = useState({});

    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);

        PanelMemberServices.registerPanelMember(inputs)
            .then((data) => {
                navigate('/panelMember');
            })

    }

    return (
        <>

            <br /><br /><br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <br />
                        <h1 className="text-center">Panel Member Registration</h1>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <br />
                                <div className="form-group">
                                    <label>Full name : </label>
                                    <input type="text" name="name" value={inputs.name || ""} onChange={handleChange} className="form-control"></input>
                                </div>
                                <div className="form-group">
                                    <label>Email address : </label>
                                    <input type="email" name="email" value={inputs.email || ""} onChange={handleChange} className="form-control"></input>
                                </div>
                                <div className="form-group">
                                    <label>Interested research field : </label>
                                    <input type="text" name="research" value={inputs.research || ""} onChange={handleChange} className="form-control"></input>
                                </div>
                                <div className="form-group">
                                    <label>Phone number : </label>
                                    <input type="tel" name="phone" value={inputs.phone || ""} onChange={handleChange} className="form-control"></input>
                                </div>
                                <div className="form-group">
                                    <label>Username : </label>
                                    <input type="text" name="username" value={inputs.username || ""} onChange={handleChange} className="form-control"></input>
                                </div>
                                <div className="form-group">
                                    <label>Password : </label>
                                    <input type="password" name="password" value={inputs.password || ""} onChange={handleChange} className="form-control"></input>
                                </div>
                                <br /><br />
                                <div className="form-group">
                                    <input type="submit" className="btn btn-success form-control"></input>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )



    // const [name, setName] = useState('');
    // const [done, setDone] = useState('');

    // const [data, setData] = useState('close');

    // useEffect (()=> {
    //     setData("open")
    //     if(name != '')
    //     setData("WORKED!!")

    //     console.log("llllll");
    // },[name])

    // const click = () => {
    //     setDone("DONE ! ")
    // }

    // return(
    //     <>
    //         <h1>{data}</h1>
    //         <h1>{name}</h1>
    //         <input type="text" onChange={(event)=>{
    //             setName(event.target.value)
    //         }} placeholder="name"></input>

    //         <button onClick={click}>Ok</button>
    //     </>
        
    // )
}