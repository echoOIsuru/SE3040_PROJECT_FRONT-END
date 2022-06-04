import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ThemeProvider, Container, Row, Col, Button, Form } from "react-bootstrap";
import "./admin.css";

const CreateSubmissionTypes = () => {

    //define navigation
    let navigate = useNavigate();

    const [SubmissionType, setSubmissionType] = useState("")
    const [SubmissionDes, setSubmissionDes] = useState("")
    const [SubmissionDeadline, setSubmissionDeadline] = useState("")

    //submit details
    const submitDetails = async (e) => {
        e.preventDefault();
        try {
            const data = {
                submission_type: SubmissionType,
                submission_description: SubmissionDes,
                submission_deadline: SubmissionDeadline,
            }
            console.log(data);

            const response = await axios.post("http://localhost:8090/api/v1/admin/create/submissionTypes", data)

            if (response.status === 201) {
                alert("New Submission Type Added to the System!!!");
                navigate("/admin/view/submissionTypes");
            }

        } catch (error) {
            if (error.response.status === 409) {
                alert(error.response.data.message);
            }
            else
                alert(error);
        }

    }

    return (
        <ThemeProvider breakpoints={['xxxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>

            <Container>

                <div Style={{ marginTop: '50px' }} className='list-title'>
                    <hr />
                    <center>
                        <h2> Create Submission Type </h2>
                    </center>
                    <hr />
                    <br /><br /><br />
                </div>


                <div className="row justify-content-md-center">
                    <div className='col-md-4'>
                        <form onSubmit={(e) => submitDetails(e)} className="body-content">
                            <Row Style={{ marginTop: '20px' }}>
                                <Col>

                                    <div>
                                        <Form.Group >
                                            <label >Submission Type:</label> <br />
                                            <input type="text" onChange={(e) => {
                                                setSubmissionType(e.target.value);
                                            }} required />
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >Submission Due Date/Time:</label> <br />
                                            <input type="datetime-local" onChange={(e) => {
                                                setSubmissionDeadline(e.target.value);
                                            }} required />
                                        </Form.Group><br />

                                        <Form.Group  >
                                            <label >Note:</label> <br />
                                            <textarea onChange={(e) => {
                                                setSubmissionDes(e.target.value);
                                            }} required />
                                        </Form.Group>


                                    </div>

                                    <br />
                                    <Button id='btn-common' variant="primary" type='submit'>Save</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button variant="outline-secondary" onClick={() => { navigate("/admin/view/submissionTypes") }}>Cancel</Button>

                                </Col>

                            </Row>
                        </form >
                    </div></div>
            </Container >
        </ThemeProvider >
    )
}

export default CreateSubmissionTypes;

