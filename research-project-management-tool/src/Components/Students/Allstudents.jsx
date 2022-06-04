import React, { useState, useEffect } from "react";
import axios from "axios";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default function AllStudent(p) {
  const [students, setStudent] = useState([]);

  function getStudent() {
    // axios.get("https://p9b173fk99.execute-api.us-east-1.amazonaws.com/dev/student/get").then((res) => {
    //   console.log(res.data);

    const student = JSON.parse(sessionStorage.getItem("STUDENT_DATA"))

    setStudent(student)
    console.log(student, "STUDENT")
    // })

  }

  useEffect(() => {
    getStudent();
  }, [])

  
 
  return (


    <div className="container">
      <h1>Student PROFILE</h1>
      <br />

      <div style={{marginTop:'60px'}}>
    
        <Link to="/group"><button type="button" style={{marginRight: "30px"}} class="btn btn-outline-dark btn-lg">Create group</button></Link>
        <Link to="/upload"><button type="button" style={{marginRight: "30px"}} class="btn btn-outline-success btn-lg">Topic Submition</button></Link>
        <Link to="/d"><button type="button" style={{marginRight: "30px"}} class="btn btn-outline-warning btn-lg">Download templates</button></Link>
        <Link to="/submition"><button type="button" style={{marginRight: "30px"}} class="btn btn-outline-primary btn-lg">Final Presentation Submition</button></Link>
        <Link to="/Dsubmition"><button type="button" style={{marginRight: "30px"}} class="btn btn-outline-primary btn-lg">Final Document Submition</button></Link>
      
      </div>
      <br /><br />
      <table className="table ">
        <thead className="table-dark">
          <tr>

            <th >name</th>
            <th>gender</th>
            <th>age</th>
            <th>NIC</th>
            <th>Email</th>
            <th>Phone Number</th>

 

          </tr>


        </thead>
       
   
 
        <tbody>
       
          {students.map(val =>
            <tr key={val._id}>
     
              <td >{val.name}</td>
              <td >{val.gender}</td>
              <td>{val.age}</td>
              <td>{val.nic}</td>
              <td>{val.email}</td> 
               <td>{val.phone}</td>
             
           
            </tr>
          )}    

        </tbody>
      </table>

      <div style={{marginTop:'60px'}}>
 
      
        <Link to="/view_group"><button type="button" style={{marginRight: "2px"}} class="btn btn-dark btn-lg">view group</button></Link>

        <Link to="/view_upload"><button type="button" style={{marginRight: "2px"}} class="btn btn-success btn-lg">view Topic Submition</button></Link>

        <Link to="/view_submition"><button type="button" style={{marginRight: "2px"}} class="btn btn-warning btn-lg">View Presentation Submition</button></Link>
    
        <Link to="/view_supervisor_topic"><button type="button" style={{marginRight: "2px"}} class="btn btn-info btn-lg">View panel member topic feedbacks</button></Link>

        <Link to="/view_Final_presentation_feedback"><button type="button" style={{marginRight: "px"}} class="btn btn-primary btn-lg">Final presentation feedbacks</button></Link>
<br/><br/>
        <Link to="/view_Dsubmition"><button type="button" style={{marginRight: "px"}} class="btn btn-primary btn-lg">view Document Submition </button></Link>
      </div>

    </div>


  )

  

}
