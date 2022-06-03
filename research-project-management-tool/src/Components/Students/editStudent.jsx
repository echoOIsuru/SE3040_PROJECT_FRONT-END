import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"


export default function EditStudent() {

  const [id, setId] = useState(useParams().id);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(""); 
  const [nic, setNic] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8090/student/get/" + id).then((res) => {
      setName(res.data.student.name)
      console.log("dsdsd",res.data)
      setAge(res.data.student.age)
      setGender(res.data.student.gender)
      setEmail(res.data.student.email)
      setPhone(res.data.student.phone)
      setNic(res.data.student.nic)
    })
  }, [])


  function sendData(e) {
    e.preventDefault();
    if (window.confirm('Are you sure you wish to update this student?')) {

      const newStudent = {

        name,
        age,
        gender,
        nic,
        email,
        phone


      }
      axios.put("http://localhost:8090/student/update/" + id, newStudent).then((res) => {
        alert(res.data.status);
        navigate("/");
      }).catch((err) => {
        alert("update succesfull")
      })
    }
  }

  return (
    <div className="container" >
      <h1>STUDENT REGISTRATION</h1>
      <form onSubmit={sendData}>


        <div className="from-group" >
          <label for="name">student Name</label>
          <input type="text" className="form-control" id="name" value={name} placeholder="Enter Student Name"
            onChange={(e) => {

              setName(e.target.value);
            }} />
        </div>


        <div className="from-group">
          <label for="age">student age</label>

          <input type="text" className="form-control" id="age" value={age} placeholder="Enter Student age"
            onChange={(e) => {

              setAge(e.target.value);
            }}

          />
        </div>


        <div className="from-group">
          <label for="nic">student nic</label>
          <input type="text" className="form-control" id="nic" value={nic}placeholder="Enter Student nic"
            onChange={(e) => {
              setNic(e.target.value);
            }} />

        </div>

        <div className="from-group">
          <label for="gender">student gender</label>
          <input type="text" className="form-control" id="gender" value={gender} placeholder="Enter Student gender"
            onChange={(e) => {
              setGender(e.target.value);
            }} />

        </div>

        
        <div className="from-group">
          <label for="email">student email</label>
          <input type="text" className="form-control" id="email" value={email}placeholder="Enter Student email"
            onChange={(e) => {
              setEmail(e.target.value);
            }} />

        </div>

        <div className="from-group">
          <label for="phone">student phone number</label>
          <input type="text" className="form-control" id="phone" value={phone}placeholder="Enter Student phone number"
            onChange={(e) => {
              setPhone(e.target.value);
            }} />

        </div>

        <br />
        <button type="submit" className="btn btn-primary">Update</button>
      </form>

    </div>


  )

}