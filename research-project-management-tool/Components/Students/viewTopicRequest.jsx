import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ViewTopicRequest(p) {
  const [students, setStudent] = useState([]);

  function getStudent() {
    axios.get("http://localhost:8090/topic/get",{withCredentials:true}).then((res) => {
      console.log(res.data);
      setStudent(res.data)
    })

  }



  useEffect(() => {
    getStudent();
  }, [])


 
  return (


    <div className="container">
      <h1>ALL Groups Topics Requests</h1>
      <br />
      <table className="table ">
        <thead className="table-dark">
          <tr>

            <th >Topic</th>
            <th>Group Leader NIC</th>
            <th>Email</th>
            

 

          </tr>


        </thead>

        <tbody>
          {students.map(val =>
            <tr key={val.nic}>

              <td >{val.topic}</td>
              <td>{val.nic}</td>
              <td>{val.email}</td> 
              
             

            </tr>
          )}

        </tbody>
      </table>
    </div>




  )

}