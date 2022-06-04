import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ThemeProvider, Container, Table, Row, Col, Button } from "react-bootstrap";
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./admin.css";
import Pagination from './Pagination';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Liststudents = () => {

    const [students, setstudents] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [indexOfFirstItem, setindexOfFirstItem] = useState(0);
    const [indexOfLastItem, setindexOfLastItem] = useState(3);
    const [recordsPerPage] = useState(3);
    const [retrievedData, setretrievedData] = useState([])

    //fetch and set retrived data 
    const fetchData = useCallback(async () => {
        try {
            const studentsData = await axios({
                method: 'GET',
                url: `https://p9b173fk99.execute-api.us-east-1.amazonaws.com/dev/api/v1/admin/students/all`
            })
            setstudents(studentsData.data)
            setretrievedData(studentsData.data)
        } catch (error) {
            alert(error);
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])




    //slice retrieved data for the pagination
    const Slicedstudents = students.slice(indexOfFirstItem, indexOfLastItem);


    const onDeletestudents = async (id) => {
        if (window.confirm('Are you sure, you want to remove the selected student?')) {
            try {
                await axios({
                    method: 'DELETE',
                    url: `https://p9b173fk99.execute-api.us-east-1.amazonaws.com/dev/api/v1/admin/students/${id}`
                })
                alert("Selected student is removed from the system!!")
                fetchData()
            } catch (error) {
                alert(error)
            }
        }
    }

    //filter data
    const filterData = (obj, key) => {

        const results = obj.filter(o =>
            Object.keys(o).some(k => o[k].toString().toLowerCase().includes(key.toLowerCase())));

        setstudents(results);

    }

    //search function
    const handleSearch = (e) => {
        const k = e.target.value.toLowerCase()

        filterData(retrievedData, k);


    }

    return (
        <ThemeProvider breakpoints={['xxxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}>

            <Container><br /><br />

                <div class="fontuser" style={{ float: 'right' }}>

                    <input className='main-search' placeholder="Search" type="text" name="search" style={{ width: '400px', height: '40px', marginLeft: '100px' }} onChange={(e) => {
                        handleSearch(e);
                    }} />
                    <i><FontAwesomeIcon icon={faMagnifyingGlass} /></i>

                </div><br /><br /><br />

                <Row >
                    <Col>
                        <h2 style={{ fontWeight: '700' }}>List of Students</h2>
                    </Col>
                </Row>

                <Row style={{ marginTop: '50px' }} className='body-content'>
                    {Slicedstudents.length > 0 ?
                        <Table responsive hover>

                            <thead>
                                <tr>
                                    <th>Student NIC</th>
                                    <th>Student Name</th>
                                    <th>Student Age</th>
                                    <th>Student Gender</th>
                                    <th>Student Email</th>
                                    <th>Student Phone Number</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Slicedstudents && Slicedstudents.map((student) => (
                                        <tr>
                                            <td>{student.nic}</td>
                                            <td>{student.name}</td>
                                            <td>{student.age}</td>
                                            <td>{student.gender}</td>
                                            <td>{student.email}</td>
                                            <td>{student.phone}</td>
                                            <td>  <Link to={`/admin/student/edit/${student._id}`} ><FontAwesomeIcon icon={faPenToSquare} /></Link>&nbsp;&nbsp;&nbsp;&nbsp;
                                                <Link to={""} onClick={() => onDeletestudents(student._id)}><FontAwesomeIcon icon={faTrashCan} /></Link>
                                            </td>
                                        </tr>
                                    ))
                                }


                            </tbody>
                        </Table>
                        : <span style={{ display: 'flex', justifyContent: 'center' }}>
                            Entries Unavailable !
                        </span>
                    }
                    <Pagination
                        itemsCount={students.length}
                        itemsPerPage={recordsPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        setindexOfLastItem={setindexOfLastItem}
                        setindexOfFirstItem={setindexOfFirstItem}
                        alwaysShown={false}
                    />
                </Row>
            </Container>
        </ThemeProvider >

    )
}

export default Liststudents;
