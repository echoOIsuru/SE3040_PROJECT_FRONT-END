import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ViewGroup(p) {
  const [students, setStudent] = useState([]);



  function getStudent() {
    const student = JSON.parse(sessionStorage.getItem("STUDENT_DATA"))
    console.log(student[0].email);

    axios.get("https://p9b173fk99.execute-api.us-east-1.amazonaws.com/dev/group/get/" + student[0].email).then((res) => {
      console.log(res.data);
      setStudent(res.data)
    })

  }



  useEffect(() => {
    getStudent();
  }, [])



  return (


    <div className="container">
      <h1>Group details</h1>
      <br />
      <table className="table ">
        <thead className="table-dark">
          <tr>

            <th >Group</th>
            <th>Group Leader </th>
            <th>member1</th>
            <th>member2</th>
            <th>member3</th>
            <th>group email adress</th>

          </tr>


        </thead>

        <tbody>
          {students.length > 0 && students[0].map(val =>
            <tr key={val.nic}>

              <td >{val.group_name}</td>
              <td>{val.leader}</td>
              <td>{val.member1}</td>
              <td>{val.member2}</td>
              <td>{val.member3}</td>
              <td>{val.email}</td>


            </tr>
          )}

        </tbody>
      </table>
    </div>




  )

}