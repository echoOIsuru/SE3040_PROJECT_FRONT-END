import React, { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import SupervisorServices from "../../../Services/Supervisors/SupervisorServices";


const PopupFeedback = ({ data }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [feedback, setFeedback] = useState("");


    const onChangeHandler = (e) => {
        setFeedback(e.target.value)
    }

    const sendFeedback = () => {
        const obj = {
            feedback: feedback,
            supervisor_id: data.supervisor,
            group_name: data.s_group.group_name,
            student_email: data.student_email,
            topic_name: data.topic,
            field: data.field
        }
        SupervisorServices.createSupervisorFeedback(obj).then(res => {
            window.alert("Feedback added Successfully")
            console.log(res.data)
        })
    }

    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}>
                Add Feedback
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Supervisor Feedback</Modal.Title>

                </Modal.Header>
                <Modal.Header >
                    <h6>Group Name :  {data.s_group.group_name}</h6>
                </Modal.Header>

                <Modal.Body>

                    <form className='form-control'>
                        <div className="mb-3">
                            <label className="form-label">Enter Feedbacks</label>
                            <textarea onChange={onChangeHandler} className="form-control" rows="5" name="topic_details" required></textarea>
                        </div>
                        <br />
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Continue
                    </Button>
                    <br />
                    <center>
                        <button className="btn btn-dark" onClick={() => { sendFeedback() }}> Submit</button>
                    </center>

                </Modal.Footer>
            </Modal>
        </>
    );


}
export default PopupFeedback