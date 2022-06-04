import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { ThemeProvider, Container, Row, Col, Button, Form } from "react-bootstrap";
import "./admin.css";

const UpdatePanelMember = () => {

    let navigate = useNavigate();
    const { id } = useParams();

    const [PanelMemberMobile, setPanelMemberMobile] = useState("")
    const [PanelMemberEmail, setPanelMemberEmail] = useState("")
    const [PanelMemberName, setPanelMemberName] = useState("")
    const [PanelMemberUserName, setPanelMemberUserName] = useState("")
    const [PanelMemberResearch, setPanelMemberResearch] = useState("")

    const editPanelMember = async (e) => {
        try {
            e.preventDefault();

            const PanelMemberD = {
                email: PanelMemberEmail,
                name: PanelMemberName,
                phone: PanelMemberMobile,
                username: PanelMemberUserName,
                research: PanelMemberResearch
            }

            await axios.put(`http://localhost:8090/api/v1/admin/panelMembers/${id}`, PanelMemberD)
            alert("Selected PanelMember Member is Updated!!");
            navigate("/admin/view/panelMembers");

        } catch (error) {
            alert(error);
        }

    }

    const fetchData = useCallback(async () => {
        try {
            const PanelMemberData = await axios({
                method: 'GET',
                url: `http://localhost:8090/api/v1/admin/panelMembers/${id}`
            })
            let IData = PanelMemberData.data;
            setPanelMemberMobile(IData.phone)
            setPanelMemberEmail(IData.email)
            setPanelMemberName(IData.name)
            setPanelMemberUserName(IData.username)
            setPanelMemberResearch(IData.research)
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
                        <h2>Edit Panel Member Details</h2>
                    </center>
                    <hr />
                    <br /><br />
                </div>
                <div className="row justify-content-md-center">
                    <div className='col-md-4'>
                        <form onSubmit={(e) => editPanelMember(e)} className={'body-content'}>
                            <Row Style={{ marginTop: '20px' }}>
                                <Col>
                                    <div>

                                        <Form.Group >
                                            <label >User Name:</label> <br />
                                            <input type="text" value={PanelMemberUserName} onChange={(e) => {
                                                setPanelMemberUserName(e.target.value);
                                            }} disabled />
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >E-mail:</label> <br />
                                            <input type="text" value={PanelMemberEmail} onChange={(e) => {
                                                setPanelMemberEmail(e.target.value);
                                            }} disabled />
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >Name:</label> <br />
                                            <input type="text" value={PanelMemberName} onChange={(e) => {
                                                setPanelMemberName(e.target.value);
                                            }} />
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >Mobile Number:</label> <br />
                                            <input type="text" value={PanelMemberMobile} onChange={(e) => {
                                                setPanelMemberMobile(e.target.value);
                                            }} required />
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >Research Field:</label> <br />
                                            <input type="text" value={PanelMemberResearch} onChange={(e) => {
                                                setPanelMemberResearch(e.target.value);
                                            }} required />
                                        </Form.Group><br />

                                    </div>

                                    <br />
                                    <Button id='btn-common' variant="primary" type='submit'>Save</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button variant="outline-secondary" onClick={() => { navigate("/admin/view/panelMembers") }}>Cancel</Button>

                                </Col>

                            </Row>
                        </form >
                        <br />
                    </div></div>
            </Container >
        </ThemeProvider >
    )
}

export default UpdatePanelMember;

