import React, { useEffect, useState } from "react";
import SupervisorServices from "../../Services/Supervisors/SupervisorServices";

export default function Supervisor() {

    const [topicRegistraionRequest, setTopicRegistraion] = useState([]);
    const [supervisor, setSupervisor] = useState([]);
    const [stat, setStat] = useState(false)

    const [len, setLen] = useState(0);
    const [current, setCurrent] = useState([]);
    const [firsIndex, setFirsIndex] = useState(0);
    const [recordsPerPage, setRecordPerPage] = useState(1);
    const [lastIndex, setLastIndex] = useState(recordsPerPage);
    const [numberOfRecords, setNumberOfRecords] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)



    useEffect(() => {
        const session = JSON.parse(sessionStorage.getItem("SUPERVISOR"))
        setSupervisor(session);

        SupervisorServices.getTopicRequestBySupervisor(session._id).then(res => {
            setTopicRegistraion(res.data)
            setLen((res.data).length)
            setNumberOfRecords(Math.ceil((res.data).length / recordsPerPage))
            setCurrent(res.data.slice(firsIndex, lastIndex))

        })
        setStat(false)
    }, [stat, firsIndex])

    const createChat = (group) => {
        /// need to get from topic registrtion
        group = {
            group_id: "GROUP_2",
            group_name: "POWER2 GROUP",
            leader: "12312asdasd",
            member1: "member1",
            member2: "member2",
            member3: "member3",
            supervisor_id: supervisor._id,
            chat_id: "chatid00222"
        }


        SupervisorServices.viewChatByGroup(group.group_id).then(res => {
            let val = (res.data).length
            if (val == 0) {
                const temp = {
                    group_id: group.group_id,
                    data: {
                        name: "supervisor",
                        chat: "Welcome to the chat",
                        date: new Date(),
                    },
                    supervisor_id: supervisor._id,
                    group_data: group
                }

                SupervisorServices.createChat(temp).then(res => {
                    console.log(res.data)
                })
            } else {
                window.alert("Chat Group already created")
            }
        })
    }

    const rejectRequest = (data) => {
        let obj = {
            id: data._id,
            s_status: "Rejected"
        }
        if (window.confirm("Do you want to reject request?")) {
            SupervisorServices.setSupervisorRequestStatus(obj).then(res => {
                setStat(true)
            })
        } else {

        }


    }

    const acceptRequest = (data) => {
        let obj = {
            id: data._id,
            s_status: "Accepted"
        }

        if (window.confirm("Do you want to accept request?")) {
            SupervisorServices.setSupervisorRequestStatus(obj).then(res => {
                setStat(true)
            })
        } else {

        }

    }

    const nextPage = (e) => {
        e.preventDefault()

        if (lastIndex != len) {
            setCurrentPage(currentPage + 1)

            setFirsIndex(lastIndex)
            setLastIndex(lastIndex + recordsPerPage)
        }

    }

    const previousPage = (e) => {
        e.preventDefault()

        if (firsIndex != 0) {
            setCurrentPage(currentPage - 1)

            setFirsIndex(firsIndex - recordsPerPage)
            setLastIndex(firsIndex)
        }

    }

    return (
        <div className="container" style={{ marginTop: "20px" }}>
            <div className="row">
                <h1 className="text-center">Supervisor</h1>
            </div>
            <div className="row">
                <div className="row" style={{ marginBottom: "20px", marginTop: "20px" }}>
                    <h2 className="text-center">Topic Registration Requests</h2>
                </div>
                <a href="supervisors/chats" className="btn btn-light">GO TO CHATS</a>
                <div className="row">
                    <table className="table">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Group Name</th>
                                <th scope="col">Student Name</th>
                                <th scope="col">Student Email</th>
                                <th scope="col">Student Mobile</th>
                                <th scope="col">Field</th>
                                <th scope="col">Topic</th>
                                <th scope="col">Topic Details</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                current.map((obj, index) => {
                                    return (
                                        <tr key={obj._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{"TO-DO"}</td>
                                            <td>{obj.student_name}</td>
                                            <td>{obj.student_email}</td>
                                            <td>{obj.student_mobile}</td>
                                            <td>{obj.field}</td>
                                            <td>{obj.topic}</td>
                                            <td>{obj.topic_details}</td>
                                            <td>
                                                <button className="btn btn-warning" onClick={() => createChat("TODO")}>Create Chat</button>
                                                {obj.s_status == "Pending" && <button className="btn btn-danger" onClick={() => rejectRequest(obj)}>Reject</button>}
                                                {obj.s_status == "Pending" && <button className="btn btn-success" onClick={() => acceptRequest(obj)}>Accept</button>}
                                                {obj.s_status == "Accepted" && <button disabled className="btn btn-success" onClick={() => acceptRequest(obj)}>Accepted</button>}
                                                {obj.s_status == "Rejected" && <button disabled className="btn btn-danger" onClick={() => rejectRequest(obj)}>Rejected</button>}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>
                    <div className="col">
                        <span>{currentPage + " out of  " + numberOfRecords}</span><br />
                        <button onClick={previousPage} disabled={firsIndex != 0 ? false : true}>BACK</button>
                        <button onClick={nextPage} disabled={lastIndex != len ? false : true}>NEXT</button>
                    </div>

                </div>
            </div>
        </div >
    )
}