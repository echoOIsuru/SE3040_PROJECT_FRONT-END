import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AllDsubmition (p) {
  const [files, setFiles] = useState([]);

  function getFile() {
    axios.get("https://p9b173fk99.execute-api.us-east-1.amazonaws.com/dev/Dsubmition/get",{withCredentials:true}).then((res) => {
      console.log(res.data);
      setFiles(res.data)
    })

  }

  useEffect(() => {
    getFile();
  }, [])


  function deleteFile(id) {
    if (window.confirm('Are you sure do you whant to delete this file?')) {
      axios.delete("https://p9b173fk99.execute-api.us-east-1.amazonaws.com/dev/Dsubmition/file-delete/" + id).then((res) => {
        alert("File deleted");
        getFile();
      })
    }
  }

  return (


    <div className="container">
      <h1>Final Presentation Submisions</h1>
      <br />
      <table className="table ">
        <thead className="table-dark">
          <tr>

            <th >group name</th>
            <th>email</th>
            <th>Date</th>
            <th>Acction</th>

          </tr>


        </thead>

        <tbody>
          {files.length>0 && files[0].map(val =>
            <tr key={val._id}>

              <td >{val.title}</td>
              <td >{val.email}</td>
              <td >{val.createdAt}</td>
              <td>
                <a className="btn btn-danger" onClick={() => deleteFile(val._id)}>
                  <i className="far fa-trash"></i>&nbsp;Delete

                </a>
              </td>

            </tr>
          )}

        </tbody>
      </table>
    </div>




  )

}