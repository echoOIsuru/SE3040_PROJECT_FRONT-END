import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { ThemeProvider, Container, Row, Col, Button, Form } from "react-bootstrap";
import "./admin.css";

const UpdateSupervisor = () => {

    //define navigation
    let navigate = useNavigate();
    const { id } = useParams();

    const [SupervisorMobile, setSupervisorMobile] = useState("")
    const [SupervisorEmail, setSupervisorEmail] = useState("")
    const [SupervisorName, setSupervisorName] = useState("")

    //edit supervisor function
    const editSupervisor = async (e) => {
        try {
            e.preventDefault();

            const SupervisorD = {
                s_email: SupervisorEmail,
                s_name: SupervisorName,
                s_mobile: SupervisorMobile,
            }

            await axios.put(`http://localhost:8090/api/v1/admin/supervisor/${id}`, SupervisorD)
            alert("Selected Supervisor Member is Updated!!");
            navigate("/admin/view/supervisors");

        } catch (error) {
            alert(error);
        }

    }

    //get supervisor by id and set to feilds
    const fetchData = useCallback(async () => {
        try {
            const SupervisorData = await axios({
                method: 'GET',
                url: `http://localhost:8090/api/v1/admin/supervisor/${id}`
            })
            let IData = SupervisorData.data;
            setSupervisorMobile(IData.s_mobile)
            setSupervisorEmail(IData.s_email)
            setSupervisorName(IData.s_name)
        } catch (error) {
            alert(error);
        };

    }, []);

    useEffect(() => {
        fetchData()
    }, [fetchData])


    return (
        <ThemeProvider breakpoints={['xxxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>

            <Container>
                <div className='list-title' Style={{ marginTop: '50px' }}>
                    <hr />
                    <center>
                        <h2>Edit Supervisor Details</h2>
                    </center>
                    <hr />
                    <br /><br />
                </div>
                <div className="row justify-content-md-center">
                    <div className='col-md-4'>
                        <form onSubmit={(e) => editSupervisor(e)} className={'body-content'}>
                            <Row Style={{ marginTop: '20px' }}>
                                <Col>
                                    <div>
                                        <Form.Group >
                                            <label >Supervisor E-mail:</label> <br />
                                            <input type="text" value={SupervisorEmail} onChange={(e) => {
                                                setSupervisorEmail(e.target.value);
                                            }} disabled />
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >Supervisor Name:</label> <br />
                                            <input type="text" value={SupervisorName} onChange={(e) => {
                                                setSupervisorName(e.target.value);
                                            }} />
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >Supervisor Mobile Number:</label> <br />
                                            <input type="text" value={SupervisorMobile} onChange={(e) => {
                                                setSupervisorMobile(e.target.value);
                                            }} required />
                                        </Form.Group><br />

                                    </div>

                                    <br />
                                    <Button id='btn-common' variant="primary" type='submit'>Save</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button variant="outline-secondary" onClick={() => { navigate("/admin/view/supervisors") }}>Cancel</Button>

                                </Col>

                            </Row>
                        </form ><br />
                    </div></div>
            </Container >
        </ThemeProvider >
    )
}

export default UpdateSupervisor;

