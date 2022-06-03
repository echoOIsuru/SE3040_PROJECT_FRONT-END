import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PanelMemberServices from '../../temp/PanelMemberServices';

export default function PptFeedback() {
        // Download the finalized topic details document
        const downldMarking = () => {
            var oReq = new XMLHttpRequest();
            var URLToPDF = "https://courseweb.sliit.lk/pluginfile.php/393828/mod_resource/content/1/SE3040-2021-S1-Assesment02-Group-Project.pdf";
    
            oReq.open("GET", URLToPDF, true);
    
            oReq.responseType = "blob";
    
            oReq.onload = function() {
                var file = new Blob([oReq.response], { 
                    type: 'application/pdf' 
                });
                
                saveAs(file, "TopicEvaluation_Marking.pdf");
            };
    
            oReq.send();
        }

    // Download the finalized topic details document
    const downld = () => {
        var oReq = new XMLHttpRequest();
        var URLToPDF = "https://courseweb.sliit.lk/pluginfile.php/393828/mod_resource/content/1/SE3040-2021-S1-Assesment02-Group-Project.pdf";

        oReq.open("GET", URLToPDF, true);

        oReq.responseType = "blob";

        oReq.onload = function() {
            var file = new Blob([oReq.response], { 
                type: 'application/pdf' 
            });
            
            saveAs(file, "Topic_Details.pdf");
        };

        oReq.send();
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
        console.log(feedback);

        let groupId = sessionStorage.getItem("GROUP_ID");
        feedback.groupId = groupId;

        PanelMemberServices.setFinalPptData(feedback)
            .then((data) => {
                const data2 = JSON.stringify(feedback);
                sessionStorage.setItem('PPT_FEEDBACK', data2);
                navigate('/viewPanel');
            })

    }
    
    return (

        <>
            <br /><br /><br />
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <br />
                        <h1 className='text-center'>Final Presentation Evaluation</h1>
                        <br />
                        <div className='card-body'>
                            <div className='form-group'>
                                <label>Download marking scheme</label>
                            </div>
                            <div className='form-group'>
                                <button onClick={downldMarking} className="btn btn-info">MARKING</button>
                            </div>
                            <br />
                            <div className='form-group'>
                                <label>Download finalized presentation document</label>
                            </div>
                            <div className='form-group'>
                                <button onClick={downld} className="btn btn-primary">DOWNLOAD</button>
                            </div>

                            <br /><br />
                            <form onSubmit={handleSubmit}>
                                <div className='form-group'>
                                    <h3>Feedback</h3>
                                </div>
                                <div className='form-group'>
                                    <textarea type="text" name="feedbacks" value={feedback.feedbacks || ""} onChange={handleChange} className="form-control" />
                                </div>
                                <br /><br />
                                <div className='text-center'>
                                    <input type="submit" value="Submit" className='btn btn-success' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}