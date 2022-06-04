import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PanelMemmberTopic(p) {
  const [students, setStudent] = useState([]);

  function getStudent() {
    axios.get("https://p9b173fk99.execute-api.us-east-1.amazonaws.com/dev/supervisorTopic").then((res) => {
      console.log(res.data);
      setStudent(res.data)
    })

  }



  useEffect(() => {
    getStudent();
  }, [])


 
  return (


    <div className="container">
      <h1>Topic Registration Status</h1>
      <br />
      <table className="table ">
        <thead className="table-dark">
          <tr>

            <th >Group Name</th>
            <th>Status </th>
            <th>Feedback</th>
     
          </tr>


        </thead>

        <tbody>
          { students.map(val =>
            <tr key={val.nic}>

              <td >{val.groupId}</td>
              <td>{val.status}</td>
              <td>{val.feedbacks}</td> 
         

            </tr>
          )}

        </tbody>
      </table>
    </div>




  )

}