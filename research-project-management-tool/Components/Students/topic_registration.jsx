import React, { useState } from "react";
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'

export default function AddTopic() {



   const [email, setEmail] = useState(""); 
   const [nic, setNic] = useState("");
   const [topic, setTopic] = useState("");


   const navigate = useNavigate();
  function sendData(e) {
    e.preventDefault();
    if (window.confirm('Do you whant to add this new student?')) {

      const newStudent = {

        topic,
        nic,
        email,
       

      }
      axios.post("http://localhost:8090/topic/add", newStudent).then((res) => {
        alert(res.data)
        // navigate("/login");
      }).catch((err) => {
        alert(" given Topic already Exist!")
      })
    }
  }

  return (
    <div className="container" >
      <h1>Topic REGISTRATION</h1>
      <form onSubmit={sendData}>


        <div className="from-group" >
          <label for="name">Topic</label>
          <input type="text" className="form-control" id="topic" placeholder="Enter Topic"
            onChange={(e) => {

              setTopic(e.target.value);
            }}required={true} />
        </div>


      

        <div className="from-group">
          <label for="nic">Group Leader nic</label>
          <input type="text" className="form-control" id="nic" placeholder="Enter group leader nic"
            onChange={(e) => {
              setNic(e.target.value);
            }} required={true}/>

        </div>


      
        
   

        <div className="from-group">
          <label for="email"> Email</label>
          <input type="text" className="form-control" id="email" placeholder="Enter  email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required={true} />

        </div>
        

        <br />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>


  )

}
