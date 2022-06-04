import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Download  (p) {
  const [files, setFiles] = useState([]);

  function getFile() {
    axios.get("http://localhost:8090/admin/getAllFiles").then((res) => {
      console.log(res.data);
      setFiles(res.data)
    })

  }

  useEffect(() => {
    getFile();
  }, [])


  function downloadFile(id) {
 
      axios.get("http://localhost:8090/admin/download/" + id).then((res) => {
    
       
      })
    
  }

  return (


    <div className="container">
      <h1>Topic Registration Submision</h1>
      <br />
      <table className="table ">
        <thead className="table-dark">
          <tr>

            <th >doccument name</th>
            <th>submition type</th>
            <th>Note</th>
            <th>Acction</th>

          </tr>


<div className=""></div>
        </thead>

        <tbody>
          {files.map(val =>
            <tr key={val._id}>

              <td >{val.document_name}</td>
              <td >{val.submission_type}</td>
              <td >{val.note}</td>
              <td>
              <a className="btn btn-danger" onClick={() =>  downloadFile(val._id)}>
                  <i className="far fa-trash"></i>&nbsp;DOWNLOAD

                </a>
              </td>

            </tr>
          )}

        </tbody>
      </table>
    </div>




  )

}