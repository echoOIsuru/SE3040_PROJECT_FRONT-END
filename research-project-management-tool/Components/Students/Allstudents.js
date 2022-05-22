import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AllStudent(p) {
  const [students, setStudent] = useState([]);

  function getStudent() {
    axios.get("http://localhost:8090/student/get",{withCredentials:true}).then((res) => {
      console.log(res.data);
      setStudent(res.data)
    })

  }

  useEffect(() => {
    getStudent();
  }, [])


 
  return (


    <div className="container">
      <h1>REGISTERED STUDENT DETAILS</h1>
      <br />
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
            <tr key={val.name}>

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
    </div>




  )

}