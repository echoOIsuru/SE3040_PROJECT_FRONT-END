import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { ThemeProvider, Container, Row, Col, Button, Form } from "react-bootstrap";
import "./admin.css";

const UpdateStudents = () => {

    let navigate = useNavigate();
    const { id } = useParams();

    const [StudentId, setStudentId] = useState("")
    const [StudentName, setStudentName] = useState("")
    const [StudentAge, setStudentAge] = useState("")
    const [StudentGender, SetStudentGender] = useState("")
    const [StudentEmail, setStudentEmail] = useState("")
    const [StudentPhoneN, setStudentPhoneN] = useState("")

    const editStudents = async (e) => {
        try {
            e.preventDefault();

            const StudentsD = {
                name: StudentName,
                age: StudentAge,
                gender: StudentGender,
                email: StudentEmail,
                phone: StudentPhoneN
            }

            await axios.put(`http://localhost:8090/api/v1/admin/students/${id}`, StudentsD)
            alert("Selected Student is Updated!!");
            navigate("/admin/view/students");

        } catch (error) {
            alert(error);
        }

    }

    const fetchData = useCallback(async () => {
        try {
            const StudentsData = await axios({
                method: 'GET',
                url: `http://localhost:8090/api/v1/admin/students/${id}`
            })
            let IData = StudentsData.data;
            setStudentId(IData.nic)
            setStudentName(IData.name)
            setStudentAge(IData.age)
            setStudentEmail(IData.email)
            SetStudentGender(IData.gender)
            setStudentPhoneN(IData.phone)
        } catch (error) {
            alert(error);
        };
        // try {
        //     const StudentGroupsData = await axios({
        //         method: 'GET',
        //         url: `http://localhost:8080/api/farmers/categories/all`
        //     })
        //     setStudentGroups(StudentGroupsData.data)
        // } catch (error) {
        //     alert(error);
        // };

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
                        <h2>Edit Student Details</h2>
                    </center>
                    <hr />
                    <br /><br />
                </div>
                <div className="row justify-content-md-center">
                    <div className='col-md-4'>
                        <form onSubmit={(e) => editStudents(e)} className={'body-content'}>
                            <Row Style={{ marginTop: '20px' }}>
                                <Col>
                                    <div>
                                        <Form.Group >
                                            <label >Student NIC:</label> <br />
                                            <input type="text" value={StudentId} onChange={(e) => {
                                                setStudentId(e.target.value);
                                            }} disabled />
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >Student Name:</label> <br />
                                            <input type="text" value={StudentName} onChange={(e) => {
                                                setStudentName(e.target.value);
                                            }} required />
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >Student Age:</label> <br />
                                            <input type="number" value={StudentAge} onChange={(e) => {
                                                setStudentAge(e.target.value);
                                            }} required />
                                        </Form.Group>

                                        <Form.Group >
                                            <label >Student Gender:</label> <br />
                                            <input type="text" value={StudentGender} onChange={(e) => {
                                                SetStudentGender(e.target.value);
                                            }} required />
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >Student E-mail:</label> <br />
                                            <input type="text" value={StudentEmail} onChange={(e) => {
                                                setStudentEmail(e.target.value);
                                            }} required />
                                        </Form.Group><br />

                                        <Form.Group >
                                            <label >Student Phone Number:</label> <br />
                                            <input type="text" value={StudentPhoneN} onChange={(e) => {
                                                setStudentPhoneN(e.target.value);
                                            }} required />
                                        </Form.Group><br />
                                    </div>

                                    <br />
                                    <Button id='btn-common' variant="primary" type='submit'>Save</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button variant="outline-secondary" onClick={() => { navigate("/admin/view/students") }}>Cancel</Button>

                                </Col>

                            </Row>
                        </form ><br />
                    </div>
                </div>
            </Container >
        </ThemeProvider >
    )
}

export default UpdateStudents;

