import React from 'react'


function SupervisorFeedback() {

    const sendFeedback = () => {

    }

    return (
        <div className="container">
            <div className="row justify-content-md-center" style={{ marginTop: "50px", marginBottom: "100px" }}>
                <h1 className="text-center">Supervisor Feedback Form</h1>
                <br /><br /><br />
                <div className='col-md-5'>
                    <form className='form-control' onSubmit={sendFeedback}>
                        <div className="mb-3">
                            <label className="form-label">Topic details</label>
                            <textarea className="form-control" rows="3" name="topic_details" required></textarea>
                        </div>
                        <br />
                        <center>
                            <input type="submit" value="Send Feedback" className="btn btn-dark " />
                        </center>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SupervisorFeedback