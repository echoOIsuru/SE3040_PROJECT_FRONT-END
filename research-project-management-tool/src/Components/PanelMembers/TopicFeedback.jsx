import React, { useEffect, useState } from "react";
import fileDownload from "js-file-download";
import { useNavigate } from "react-router-dom";
import PanelMemberServices from "../../Services/PanelMembers/PanelMemberServices";

export default function TopicFeedback() {

    const [details, setDetails] = useState([]);

    useEffect(() => {
        let groupId = sessionStorage.getItem("GROUP_ID");
        groupId = JSON.parse(groupId);
        setDetails(groupId);
        console.log(">>>>>>>", groupId);

    },[])

    // Download marking scheme
    const downldMarking = async(event) => {
        event.preventDefault();
        // const { data } = await PanelMemberServices.markingDownload();
        // fileDownload(data, "Topic_evaluate_marking.pdf")
        const { data } = await PanelMemberServices.markingDownload(details._id);
        fileDownload(data, "Topic_evaluate_marking.pdf");
    }

    // Download the finalized topic details document
    const downld = async(event) => {
        event.preventDefault();
        // const { data } = await PanelMemberServices.topicDownload();
        // fileDownload(data, "Finalized_topic_details.pdf")
        const { data } = await PanelMemberServices.topicDownload(details._id);
        fileDownload(data, details.title + ".pdf");
    }

    // Submit feedback
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFeedback(values => ({...values, [name] : value}));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // let groupId = sessionStorage.getItem("GROUP_ID");
        // groupId = JSON.parse(groupId);

        // console.log(">>>>>>>", groupId);

        feedback.groupId = details.title;
        console.log(feedback);

        PanelMemberServices.updateStatus(details.title, feedback);

        PanelMemberServices.setTopicEvaluationData(feedback)
        .then((data) => {
            navigate('/viewPanel');
        })

    }
    
    return (

        <>
            <br /><br /><br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <br />
                        <h1 className="text-center">Topic Evaluation</h1>
                        <br />
                        <div className="card-body">
                            <div className="form-group">
                                <label>Download marking scheme</label>
                            </div>
                            <div className="form-group">
                                <button onClick={downldMarking} className="btn btn-info">MARKING</button>
                            </div>
                            <br />
                            <div className="form-group">
                                <label>Download finalized topic details document</label>
                            </div>
                            <div className="form-group">
                                <button onClick={downld} className="btn btn-primary">DOWNLOAD</button>
                            </div>
                            
                            <br /><br />
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <h3>Feedback</h3>
                                </div>
                                <div className="form-group">
                                    <textarea type="text" name="feedbacks" value={feedback.feedbacks || ""} onChange={handleChange} className="form-control"/>
                                </div>
                                <br /><br />
                                <div className="text-center">
                                    <input type="submit" name="status" value="reject" onClick={handleChange} className="btn btn-danger"/>
                                    <input type="submit" name="status" value="accept" onClick={handleChange} className="btn btn-success"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}