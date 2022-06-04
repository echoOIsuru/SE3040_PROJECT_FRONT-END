import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ThemeProvider, Container, Table, Row, Col, Button } from "react-bootstrap";
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./admin.css";
import Pagination from './Pagination';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const ListSupervisor = () => {

    const [Supervisor, setSupervisor] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [indexOfFirstItem, setindexOfFirstItem] = useState(0);
    const [indexOfLastItem, setindexOfLastItem] = useState(3);
    const [recordsPerPage] = useState(3);
    const [retrievedData, setretrievedData] = useState([])


    //fetch and set retrived data 
    const fetchData = useCallback(async () => {
        try {
            const supervisorData = await axios({
                method: 'GET',
                url: `https://p9b173fk99.execute-api.us-east-1.amazonaws.com/dev/api/v1/admin/supervisor/all`
            })
            setSupervisor(supervisorData.data)
            setretrievedData(supervisorData.data)
        } catch (error) {
            alert(error);
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])




    //slice retrieved data for the pagination
    const Slicedsupervisor = Supervisor.slice(indexOfFirstItem, indexOfLastItem);

    //delete supervisor
    const onDeletesupervisor = async (id) => {
        if (window.confirm('Are you sure, you want to remove the selected Supervisor?')) {
            try {
                await axios({
                    method: 'DELETE',
                    url: `http://localhost:8090/api/v1/admin/supervisor/${id}`
                })
                alert("Selected Supervisor is removed from the system!!")
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

        setSupervisor(results);

    }

    //handle search function
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
                        <h2 style={{ fontWeight: '700' }}>List of Supervisors</h2>
                    </Col>
                </Row>

                <Row style={{ marginTop: '50px' }} className='body-content'>
                    {Slicedsupervisor.length > 0 ?
                        <Table responsive hover>

                            <thead>
                                <tr>
                                    <th>Supervisor Name</th>
                                    <th>Supervisor Contact Number</th>
                                    <th>Supervisor E-mail</th>
                                    <th>Supervisor Fields</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Slicedsupervisor && Slicedsupervisor.map((supervisor) => (
                                        <tr>
                                            <td>{supervisor.s_name}</td>
                                            <td>{supervisor.s_mobile}</td>
                                            <td>{supervisor.s_email}</td>
                                            <td>{supervisor.fields}</td>
                                            <td>  <Link to={`/admin/supervisor/edit/${supervisor._id}`} ><FontAwesomeIcon icon={faPenToSquare} /></Link>&nbsp;&nbsp;&nbsp;&nbsp;
                                                <Link to={""} onClick={() => onDeletesupervisor(supervisor._id)}><FontAwesomeIcon icon={faTrashCan} /></Link>
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
                        itemsCount={Supervisor.length}
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

export default ListSupervisor;
