import React, { useEffect, useState } from 'react'
import SupervisorServices from '../../Services/Supervisors/SupervisorServices';
import fileDownload from "js-file-download";
import PopupWindow from "./SupervisorComponents/PopupWindow";
import PopupFeedback from './SupervisorComponents/PopupFeedback';

function SupervisorDocumentEvaluation() {
    const [documentSubmission, setDocumentSubmission] = useState([]);
    const [loading, setLoding] = useState(false);
    const [loading2, setLoding2] = useState(false);
    const [supervisor, setSupervisor] = useState([]);
    const [see, setSee] = useState(false);


    useEffect(() => {

        const session = JSON.parse(sessionStorage.getItem("SUPERVISOR"))
        setSupervisor(session);

        SupervisorServices.getAllDocumentSubmissions().then(res => {
            console.log(res.data, "ALL_SUBMISSIONS")

            const tempDoc = [];
            (res.data).forEach(element => {
                SupervisorServices.getTopicRequestByGroupName(element.title).then(res2 => {
                    tempDoc.push({ ...res2.data, ...element })
                })
            });

            console.log(tempDoc, "FINAL")
            setDocumentSubmission(tempDoc)

        })

        // setDocumentSubmission([
        //     {
        //         group_name: "GG",
        //         leader: "IT20132321",
        //         topic: "Research GG",
        //         interested_field: "field 1",
        //         document: "asdasd qwoeiqwje poqiweuqwoie"
        //     }, {
        //         group_name: "GG",
        //         leader: "IT20132321",
        //         topic: "Research GG",
        //         interested_field: "field 1",
        //         document: "asdasd qwoeiqwje poqiweuqwoie"
        //     }, {
        //         group_name: "GG",
        //         leader: "IT20132321",
        //         topic: "Research GG",
        //         interested_field: "field 1",
        //         document: "asdasd qwoeiqwje poqiweuqwoie"
        //     },
        // ])
    }, [])

    const viewData = () => {
        setLoding2(true)
        setTimeout(() => {
            setSee(true)
            setLoding2(false)
        }, 1000)

    }

    const handleDownloadPDF = async (e) => {
        e.preventDefault()
        setLoding(true)
        const { data } = await SupervisorServices.downloadSupervisorMarking();
        fileDownload(data, "Marking-Scheme.pdf")
        setLoding(false)
    }

    const downloadGroupSubmisstion = async (id, name) => {
        setLoding(true)
        const { data } = await SupervisorServices.downloadPDF(id);
        fileDownload(data, name + ".pdf")
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
                        {
                            see == false ?
                                <>
                                    <center>
                                        <button className='btn btn-danger' onClick={() => { viewData() }}>
                                            {loading2 && (
                                                <i
                                                    className="fa fa-refresh fa-spin"
                                                    style={{ marginRight: "5px" }}
                                                />
                                            )}
                                            {loading2 && <span>
                                                Submissions are loading... </span>}
                                            {!loading2 && <span>
                                                Load submissions </span>}

                                            <i className="bi bi-download"></i>



                                        </button>
                                    </center>
                                </> :
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
                                                    obj.s_status == "Accepted" &&
                                                    <tr key={index + 1}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{obj.s_group.group_name}</td>
                                                        <td>{obj.s_group.leader}</td>
                                                        <td>{obj.topic}</td>
                                                        <td>{obj.field}</td>
                                                        <td><button className="btn btn-outline-success" onClick={() => { downloadGroupSubmisstion(obj._id, obj.s_group.group_name) }}>
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
                                                        </td>
                                                        <td><PopupFeedback data={obj} /></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>

                                </table>
                        }
                    </div>

                </div>
            </div >
        </div >
    )
}

export default SupervisorDocumentEvaluation