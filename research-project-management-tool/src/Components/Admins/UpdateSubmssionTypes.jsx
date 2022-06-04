import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { ThemeProvider, Container, Row, Col, Button, Form } from "react-bootstrap";
import "./admin.css";

const UpdateSubmissionTypes = () => {

    let navigate = useNavigate();
    const { id } = useParams();

    const [SubmissionType, setSubmissionType] = useState("")
    const [SubmissionDes, setSubmissionDes] = useState("")
    const [SubmissionDeadline, setSubmissionDeadline] = useState("")

    const fetchData = useCallback(async () => {
        try {
            const StudentsData = await axios({
                method: 'GET',
                url: `http://localhost:8090/api/v1/admin/submissionTypes/${id}`
            })
            let IData = StudentsData.data;
            setSubmissionType(IData.submission_type)
            setSubmissionDes(IData.submission_description)
            setSubmissionDeadline(IData.submission_deadline)
        } catch (error) {
            alert(error);
        };

    }, []);

    useEffect(() => {
        fetchData()
    }, [fetchData])



    const submitDetails = async (e) => {
        e.preventDefault();
        try {
            const data = {
                submission_description: SubmissionDes,
                submission_deadline: SubmissionDeadline,
            }
            console.log(data);

            const response = await axios.put(`http://localhost:8090/api/v1/admin/submissionTypes/${id}`, data)

            if (response.status === 200) {
                alert("Submission Type is Updated!!!");
                navigate("/admin/view/submissionTypes");
            }

        } catch (error) {
            alert(error);
        }

    }

    return (
        <ThemeProvider breakpoints={['xxxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>

            <Container>

                <div Style={{ marginTop: '50px' }} className='list-title'>
                    <hr />
                    <center>
                        <h2> Update Submission Type </h2>
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
                                            <input type="text" value={SubmissionType} disabled />
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >Submission Due Date/Time:</label> <br />
                                            <input type="datetime-local" value={SubmissionDeadline} onChange={(e) => {
                                                setSubmissionDeadline(e.target.value);
                                            }} required />
                                        </Form.Group><br />

                                        <Form.Group  >
                                            <label >Note:</label> <br />
                                            <textarea value={SubmissionDes} onChange={(e) => {
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

export default UpdateSubmissionTypes;

