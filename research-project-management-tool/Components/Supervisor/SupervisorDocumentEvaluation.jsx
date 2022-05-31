import React, { useEffect, useState } from 'react'
import SupervisorServices from '../../Services/Supervisors/SupervisorServices';
import fileDownload from "js-file-download";

function SupervisorDocumentEvaluation() {
    const [documentSubmission, setDocumentSubmission] = useState([]);
    const [loading, setLoding] = useState(false);

    useEffect(() => {
        setDocumentSubmission([
            {
                group_name: "GG",
                leader: "IT20132321",
                topic: "Research GG",
                interested_field: "field 1",
                document: "asdasd qwoeiqwje poqiweuqwoie"
            }, {
                group_name: "GG",
                leader: "IT20132321",
                topic: "Research GG",
                interested_field: "field 1",
                document: "asdasd qwoeiqwje poqiweuqwoie"
            }, {
                group_name: "GG",
                leader: "IT20132321",
                topic: "Research GG",
                interested_field: "field 1",
                document: "asdasd qwoeiqwje poqiweuqwoie"
            },
        ])
    }, [])


    const handleDownloadPDF = async (e) => {
        e.preventDefault()
        setLoding(true)
        const { data } = await SupervisorServices.downloadPDF();
        fileDownload(data, "Marking-Scheme.pdf")
        setLoding(false)
    }

    return (
        <div className="container" style={{ marginTop: "20px", marginBottom: "50px" }}>
            <div className="row">
                <h1 className="text-center">Document Evaluation</h1>
            </div>
            <div className="row" style={{ marginTop: "20px", marginBottom: "50px" }}>
                <div className="row justify-content-md-center" style={{ marginTop: "20px", marginBottom: "50px" }}>
                    <div className='col-md-5'>
                        <h3 className="text-center">Marking schemes</h3>
                    </div>
                    <div className="col-md-3">
                        <button className='btn btn-warning' onClick={handleDownloadPDF}>
                            {loading && (
                                <i
                                    className="fa fa-refresh fa-spin"
                                    style={{ marginRight: "5px" }}
                                />
                            )}
                            {loading && <span> Downloading  </span>}
                            {!loading && <span> DOWNLOAD </span>}

                            <i className="bi bi-download"></i>
                        </button>
                    </div>
                </div>
                <br /> <br />
                <div className="row justify-content-md-center">
                    <div className='col-md-8'>
                        <h2 className="text-center">Submitted Documents</h2>
                        <br /> <br />
                        <table className="table">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Group Name</th>
                                    <th scope="col">Leader</th>
                                    <th scope="col">Topic Name</th>
                                    <th scope="col">Interest Field</th>
                                    <th scope="col">Document</th>
                                    <th scope="col">Feedbacks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    documentSubmission.map((obj, index) => {
                                        return (
                                            <tr key={index + 1}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{obj.group_name}</td>
                                                <td>{obj.leader}</td>
                                                <td>{obj.topic}</td>
                                                <td>{obj.interested_field}</td>
                                                <td><button className="btn btn-success" >Download</button>
                                                </td>
                                                <td><td><a href="/supervisors/document-feedbacks" className='btn btn-primary'>Feedbacks</a></td></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>

                        </table>
                    </div>

                </div>
            </div >
        </div >
    )
}

export default SupervisorDocumentEvaluation