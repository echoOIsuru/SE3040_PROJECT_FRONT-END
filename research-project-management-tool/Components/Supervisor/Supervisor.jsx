import React, { useEffect, useState } from "react";

export default function Supervisor() {

    const [topicRegistraionRequest, setTopicRegistraion] = useState([]);

    useEffect(() => {
        setTopicRegistraion([
            {
                group_name: "GG",
                leader: "IT20132321",
                topic: "Research GG",
                interested_field: "field 1",
                details: "asdasd qwoeiqwje poqiweuqwoie"
            }, {
                group_name: "GG",
                leader: "IT20132321",
                topic: "Research GG",
                interested_field: "field 1",
                details: "asdasd qwoeiqwje poqiweuqwoie"
            }, {
                group_name: "GG",
                leader: "IT20132321",
                topic: "Research GG",
                interested_field: "field 1",
                details: "asdasd qwoeiqwje poqiweuqwoie"
            },
        ])
    }, [])

    return (
        <div className="container" style={{ marginTop: "20px" }}>
            <div className="row">
                <h1 className="text-center">Supervisor</h1>
            </div>
            <div className="row">
                <div className="row" style={{ marginBottom: "20px", marginTop: "20px" }}>
                    <h2 className="text-center">Topic Registration Requests</h2>
                </div>
                <div className="row">
                    <table className="table">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Group Name</th>
                                <th scope="col">Leader</th>
                                <th scope="col">Topic Name</th>
                                <th scope="col">Interest Field</th>
                                <th scope="col">Document</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                topicRegistraionRequest.map((obj, index) => {
                                    return (
                                        <tr key={index + 1}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{obj.group_name}</td>
                                            <td>{obj.leader}</td>
                                            <td>{obj.topic}</td>
                                            <td>{obj.interested_field}</td>
                                            <td>{obj.details}</td>
                                            <td><button className="btn btn-success">Accept</button>
                                                <button className="btn btn-danger">Reject</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </div >
    )
}