import React, { useState } from "react";
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'

export default function AddStudent() {


  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
   const [email, setEmail] = useState(""); 
   const [nic, setNic] = useState("");
   const [password, setPassword] = useState("");


   const navigate = useNavigate();
  function sendData(e) {
    e.preventDefault();
    if (window.confirm('Do you whant to add this new student?')) {

      const newStudent = {

        name,
        age,
        gender,
        nic,
        email,
        phone,
        password,
        
      }
      axios.post("http://localhost:8090/student/add", newStudent).then((res) => {
        alert(res.data)
        navigate("/");
      }).catch((err) => {
        alert("User with given email or already Exist!")
      })
    }
  }

  return (
    <div className="container" >
      <h1>STUDENT REGISTRATION</h1>
      <form onSubmit={sendData}>


        <div className="text-light bg-secondary" >
          <label for="name">student Name</label>
          <input type="text" className="form-control" id="name" placeholder="Enter Student Name"
            onChange={(e) => {

              setName(e.target.value);
            }}required={true} />
        </div>


        <div className="text-light bg-success">
          <label for="age">student age</label>

          <input type="text" className="form-control" id="age" placeholder="Enter Student age"
            onChange={(e) => {

              setAge(e.target.value);
            }}

            required={true}/>
        </div>

        <div className="text-light bg-secondary">
          <label for="nic">student nic</label>
          <input type="text" className="form-control" id="nic" placeholder="Enter Student nic"
            onChange={(e) => {
              setNic(e.target.value);
            }} required={true}/>

        </div>


        <div className="text-light bg-success">
          <label for="gender">student gender</label>
          <input type="text" className="form-control" id="gender" placeholder="Enter Student gender"
            onChange={(e) => {
              setGender(e.target.value);
            }} required={true}/>

        </div>

        
        <div className="text-light bg-secondary">
          <label for="phone">student phone number</label>
          <input type="text" className="form-control" id="phone" placeholder="Enter Student phone number"
            onChange={(e) => {
              setPhone(e.target.value);
            }} required={true}/>

        </div>


        <div className="text-light bg-success">
          <label for="email">student email</label>
          <input type="text" className="form-control" id="email" placeholder="Enter Student email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required={true} />

        </div>
        <div className="text-light bg-secondary">
          <label for="email">password</label>
          <input type="password" className="form-control" id="password" placeholder="Enter password"
            onChange={(e) => {
              setPassword(e.target.value);
            }} required={true} />

        </div>


        <br />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>


  )

}