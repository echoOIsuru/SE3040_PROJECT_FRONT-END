import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { ThemeProvider, Container, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faS } from '@fortawesome/fontawesome-svg-core';
import AllocatedGroups from './AllocatedGroupsSlideView';

const PanelAllocation = () => {

    let navigate = useNavigate();
    const { id } = useParams();
    const isAdd = !id;

    const [StudentGroup, setStudentGroup] = useState("")
    const [PanelMember1, setPanelMember1] = useState("")
    const [PanelMember2, setPanelMember2] = useState("")
    const [StudentGroups, setStudentGroups] = useState([])
    const [PanelMembers, setPanelMembers] = useState([])
    const [AllocatedPanels, setAllocatedPanels] = useState([])
    const [show, setShow] = useState(false);

    function submitDetails(e) {
        return isAdd
            ? createPanelAllocation(e)
            : updateAllocatedPanel(id, e)
    }

    const createPanelAllocation = async (e) => {
        e.preventDefault();
        try {
            const data = {
                student_group: StudentGroup,
                panel_member1: PanelMember1,
                panel_member2: PanelMember2,
            }

            const response = await axios.post("https://p9b173fk99.execute-api.us-east-1.amazonaws.com/dev/api/v1/admin/create/panelAllocation", data)

            if (response.status === 201) {
                alert("Successfully Allocated " + PanelMember1 + " and " + PanelMember2 + " to " + StudentGroup + " Group")
                navigate("/admin/view/allocatedPanels");
            }

        } catch (error) {
            if (error.response.status === 409) {
                alert(error.response.data.message);
            } else {
                alert(error);
            }
        }

    }

    const updateAllocatedPanel = async (id, e) => {
        try {
            e.preventDefault();

            const updateData = {
                student_group: StudentGroup,
                panel_member1: PanelMember1,
                panel_member2: PanelMember2,
            }

            await axios.put(`https://p9b173fk99.execute-api.us-east-1.amazonaws.com/dev/api/v1/admin/AllocatedPanel/${id}`, updateData)
            alert("You have Successfully Updated the Panel!!")
            navigate("/admin/view/allocatedPanels");

        } catch (error) {
            alert(error);
        }

    }

    const fetchData = useCallback(async () => {
        if (!isAdd) {
            try {
                const resData = await axios({
                    method: 'GET',
                    url: `https://p9b173fk99.execute-api.us-east-1.amazonaws.com/dev/api/v1/admin/AllocatedPanel/${id}`
                })
                let AllocGrp = resData.data;
                setStudentGroup(AllocGrp.student_group)
                setPanelMember1(AllocGrp.panel_member1)
                setPanelMember2(AllocGrp.panel_member2)
            } catch (error) {
                alert(error);
            };
        }
        try {
            const AllocatedPanelData = await axios({
                method: 'GET',
                url: `https://p9b173fk99.execute-api.us-east-1.amazonaws.com/dev/api/v1/admin/AllocatedPanels/all`
            })
            setAllocatedPanels(AllocatedPanelData.data)
        } catch (error) {
            alert(error);
        };
        try {
            const GrpData = await axios({
                method: 'GET',
                url: `https://p9b173fk99.execute-api.us-east-1.amazonaws.com/dev/api/v1/admin/studentGroups/all`
            })
            setStudentGroups(GrpData.data)
        } catch (error) {
            alert(error);
        };
        try {
            const PanelData = await axios({
                method: 'GET',
                url: `https://p9b173fk99.execute-api.us-east-1.amazonaws.com/dev/api/v1/admin/panelMembers/all`
            })
            setPanelMembers(PanelData.data)
        } catch (error) {
            alert(error);
        };


    }, []);

    useEffect(() => {
        fetchData()
    }, [fetchData])

    let filteredGrps = StudentGroups.slice()

    var StGrps = AllocatedPanels.map((mx) => mx.student_group)

    for (let i = 0; i < StGrps.length; i++) {
        console.log("testzx", StGrps[i])
        filteredGrps = filteredGrps.filter(item => item.group_name.toLowerCase() != StGrps[i].toLowerCase());
    }
    let StudentGrpList = filteredGrps.length > 0
        && filteredGrps.map((grp) => {
            return (
                <option value={grp.group_name}>{grp.group_name}</option>
            )
        });
    let PanelMemList = PanelMembers.length > 0
        && PanelMembers.map((panel) => {
            return (
                <option value={panel.username}>{panel.username}</option>
            )
        });

    const handleViewClose = () => setShow(false);

    return (
        <ThemeProvider breakpoints={['xxxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>

            <Container>

                <div Style={{ marginTop: '50px' }} className='list-title'>
                    <hr />
                    <center>
                        <h2 style={{ fontWeight: '600' }}>{isAdd ? 'Allocate Panel Members to Groups' : 'Edit Panel Member Allocated Groups'}</h2>
                    </center>
                    <hr />
                    <br /><br />
                </div>
                <div style={{ float: 'right' }}>

                    <Button style={{ width: '160px', height: '50px' }} variant="outline-info" onClick={() => setShow(true)}>Allocated Panels</Button>

                </div><br /><br /><br />
                <Form onSubmit={(e) => submitDetails(e)} className={'body-content'}>
                    <Row className='btn-group'>
                        <Col >
                            <Button variant="outline-secondary" onClick={() => { navigate("/admin/view/allocatedPanels") }}>Cancel</Button>
                        </Col>
                        <Col >
                            <Button id='btn-common' variant="primary" type='submit'>Submit</Button>
                        </Col>
                    </Row>
                    <Row Style={{ marginTop: '20px' }}>
                        <Col>
                            {!isAdd &&
                                <><Row>
                                    <Col>
                                        <label for="StudentGroup">Student Group Name:</label> <br />
                                        <input className="form-control" value={StudentGroup} name="StudentGroup" onChange={(e) => {
                                            setStudentGroup(e.target.value);
                                        }} disabled />

                                    </Col>
                                    <Col>

                                        <label for="PanelMember1">First Panel Member:</label> <br />
                                        <select className="form-select" type="text" name="PanelMember1" value={PanelMember1} onChange={(e) => {
                                            if (e.target.value == PanelMember2) {
                                                alert("You have already selected this Panel Member!! Select a Different Member.")
                                            }
                                            else
                                                setPanelMember1(e.target.value);
                                        }} required >
                                            <option value="" disabled={true} style={{ textAlign: "center" }}></option>
                                            {PanelMemList}
                                        </select>
                                    </Col>
                                    <Col>

                                        <label for="PanelMember2">Second Panel Member:</label> <br />
                                        <select className="form-select" type="text" value={PanelMember2} onChange={(e) => {
                                            if (e.target.value == PanelMember1) {
                                                alert("You have already selected this Panel Member!! Select a Different Member.")
                                            }
                                            else
                                                setPanelMember2(e.target.value);
                                        }} required >
                                            <option value="" disabled={true} style={{ textAlign: "center" }}></option>
                                            {PanelMemList}
                                        </select>
                                    </Col>

                                </Row>
                                </>
                            }

                            {isAdd &&

                                <Row>
                                    <Col>
                                        <label for="StudentGroup">Student Group Name:</label> <br />
                                        <select className="form-select" value={StudentGroup} name="StudentGroup" onChange={(e) => {
                                            setStudentGroup(e.target.value);
                                        }} required>
                                            <option value="" disabled={true} style={{ textAlign: "center" }}></option>
                                            {StudentGrpList}
                                        </select>
                                    </Col>
                                    <Col>
                                        <label for="PanelMember1">First Panel Member:</label> <br />
                                        <select className="form-select" value={PanelMember1} type="text" name="PanelMember1" onChange={(e) => {
                                            if (e.target.value == PanelMember2) {
                                                alert("You have already selected this Panel Member!! Select a Different Member.")
                                            }
                                            else
                                                setPanelMember1(e.target.value);
                                        }} required >
                                            <option value="" disabled={true} style={{ textAlign: "center" }}></option>
                                            {PanelMemList}
                                        </select>
                                    </Col>
                                    <Col>
                                        <label for="PanelMember2">Second Panel Member:</label> <br />
                                        <select className="form-select" value={PanelMember2} type="text" onChange={(e) => {
                                            if (e.target.value == PanelMember1) {
                                                alert("You have already selected this Panel Member!! Select a Different Member.")
                                            }
                                            else
                                                setPanelMember2(e.target.value);
                                        }} required >
                                            <option value="" disabled={true} style={{ textAlign: "center" }}></option>
                                            {PanelMemList}
                                        </select>
                                    </Col>
                                </Row>

                            }
                        </Col>
                    </Row>
                </Form>

                <AllocatedGroups
                    show={show}
                    handleClose={handleViewClose}
                    placement={'end'}
                    title={"Allocated Panels"}
                    body={(
                        <table>
                            <thead>
                                <tr>
                                    <th>Student Group Name</th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                    <th>First Panel Member</th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                    <th>Second Panel Member</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    AllocatedPanels && AllocatedPanels.map((allocpanels) => (
                                        <>
                                            <br />
                                            <tr>
                                                <td>{allocpanels.student_group}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                                <td>{allocpanels.panel_member1}</td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                                <td>{allocpanels.panel_member2}</td>
                                            </tr>
                                            <br />
                                        </>
                                    ))
                                }


                            </tbody>
                        </table>
                    )}
                />

            </Container>
        </ThemeProvider>
    )
}

export default PanelAllocation;

