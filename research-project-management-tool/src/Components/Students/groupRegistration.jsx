import React, { useState } from "react";
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'

export default function AddGroup() {



  const [group_name, setgroup_name] = useState("");
  const [leader, setleader] = useState("");
  const [member1, setmember1] = useState("");
  const [member2, setmember2] = useState("");
  const [member3, setmember3] = useState("");
  const [leader_nic, setleader_nic] = useState("");
  const [member1_nic, setmember1_nic] = useState("");
  const [member2_nic, setmember2_nic] = useState("");
  const [member3_nic, setmember3_nic] = useState("");
  const [email, setemail] = useState("");
  const navigate = useNavigate();
  function sendData(e) {
    e.preventDefault();
    if (window.confirm('Do you whant to create new group?')) {

      const newgroup = {

        group_name,
        leader,
        member1,
        member2,
        member3,
        leader_nic,
        member1_nic,
        member2_nic,
        member3_nic,
        email,
      }
      axios.post("https://p9b173fk99.execute-api.us-east-1.amazonaws.com/dev/group/add", newgroup).then((res) => {
        alert(res.data)
        navigate("/student_home");

      }).catch((err) => {
        alert(" given group already Exist!")
      })
    }
  }

  return (
    <div className="container " >
      <h1>Group REGISTRATION</h1>
      <form onSubmit={sendData}>


        <div className="text-light bg-secondary" >
          <label for=" group_name">group name</label>
          <input type="text" className="form-control" id=" group_name" placeholder="Enter  group name"
            onChange={(e) => {

              setgroup_name(e.target.value);
            }} required={true} />
        </div>


        <div className="text-light bg-success">
          <label for="email">Group Leader email</label>
          <input type="text" className="form-control" id="leader" placeholder="Enter group leader email"
            onChange={(e) => {
              setemail(e.target.value);
            }} required={true} />

        </div>




        <div className="text-light bg-secondary">
          <label for="leader">Group Leader name</label>
          <input type="text" className="form-control" id="leader" placeholder="Enter group leader name"
            onChange={(e) => {
              setleader(e.target.value);
            }} required={true} />

        </div>






        <div className="text-light bg-success">
          <label for=" member1"> first  member  name</label>
          <input type="text" className="form-control" id=" member1" placeholder="Enter  first member name"
            onChange={(e) => {
              setmember1(e.target.value);
            }} required={true} />

        </div>
        <div className="text-light bg-secondary">
          <label for=" member2"> second member name</label>
          <input type="text" className="form-control" id=" member2" placeholder="Enter  second member name"
            onChange={(e) => {
              setmember2(e.target.value);
            }} required={true} />

        </div>


        <div className="text-light bg-success">
          <label for=" member3">third member name</label>
          <input type="text" className="form-control" id=" member3" placeholder="Enter  third member name"
            onChange={(e) => {
              setmember3(e.target.value);
            }} required={true} />

        </div>



        <div className="text-light bg-secondary">
          <label for=" leader_nic"> leader_nic</label>
          <input type="text" className="form-control" id=" leader_nic" placeholder="Enter  leader nic"
            onChange={(e) => {
              setleader_nic(e.target.value);
            }} required={true} />

        </div>
        
        <div className="text-light bg-success">
          <label for=" member1_nic">first member nic</label>
          <input type="text" className="form-control" id=" member1_nic" placeholder="Enter  first member nic"
            onChange={(e) => {
              setmember1_nic(e.target.value);
            }} required={true} />

        </div>
        <div className="text-light bg-secondary">
          <label for=" member2_nic">second member nic</label>
          <input type="text" className="form-control" id=" member2_nic" placeholder="Enter  second member nic"
            onChange={(e) => {
              setmember2_nic(e.target.value);
            }} required={true} />

        </div>


        <div className="text-light bg-success">
          <label for=" member3_nic">third member nic</label>
          <input type="text" className="form-control" id=" member3_nic" placeholder="Enter  third member nic"
            onChange={(e) => {
              setmember3_nic(e.target.value);
            }} required={true} />

        </div>



        <br />

        <button type="submit"  className="btn btn-success" >Submit</button>
      </form>

    </div>


  )

}
