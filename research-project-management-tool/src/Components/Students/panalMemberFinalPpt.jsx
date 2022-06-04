import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PanelMemmberPpt(p) {
  const [students, setStudent] = useState([]);

  function getStudent() {
    axios.get("https://p9b173fk99.execute-api.us-east-1.amazonaws.com/dev/supervisorPpt").then((res) => {
      console.log(res.data);
      setStudent(res.data)
    })

  }



  useEffect(() => {
    getStudent();
  }, [])


 
  return (


    <div className="container">
      <h1>Final Presentation Feedback</h1>
      <br />
      <table className="table ">
        <thead className="table-dark">
          <tr>

            {/* <th >ID</th> */}
            <th>Group Name </th>
            <th>Feedback</th>
     
          </tr>


        </thead>

        <tbody>
          { students.map(val =>
            <tr key={val.nic}>
{/* 
              <td >{val._id}</td> */}
              <td>{val.groupId}</td>
              <td>{val.feedbacks}</td> 
         

            </tr>
          )}

        </tbody>
      </table>
    </div>




  )

}