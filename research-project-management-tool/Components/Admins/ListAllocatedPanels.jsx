import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ThemeProvider, Container, Table, Row, Col, Button } from "react-bootstrap";
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./admin.css";
import Pagination from './Pagination';

const ListAllocatedPanels = () => {

    const [AllocatedPanels, setAllocatedPanels] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [indexOfFirstItem, setindexOfFirstItem] = useState(0);
    const [indexOfLastItem, setindexOfLastItem] = useState(3);
    const [recordsPerPage] = useState(3);
    const [retrievedData, setretrievedData] = useState([])

    const fetchData = useCallback(async () => {
        try {
            const AllocatedPanelsData = await axios({
                method: 'GET',
                url: `http://localhost:8090/api/v1/admin/AllocatedPanels/all`
            })
            setAllocatedPanels(AllocatedPanelsData.data)
            setretrievedData(AllocatedPanelsData.data)
        } catch (error) {
            alert(error);
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    //slice retrieved data for the pagination
    const SlicedAllocatedPanels = AllocatedPanels.slice(indexOfFirstItem, indexOfLastItem);


    const onDeleteAllocatedPanels = async (id) => {
        if (window.confirm('Are you sure, you want to remove the selected Panel?')) {
            try {
                await axios({
                    method: 'DELETE',
                    url: `http://localhost:8090/api/v1/admin/AllocatedPanel/${id}`
                })
                alert("Selected panel is removed from the system!!")
                fetchData()
            } catch (error) {
                alert(error)
            }
        }
    }


    const filterData = (obj, key) => {

        const results = obj.filter(o =>
            Object.keys(o).some(k => o[k].toString().toLowerCase().includes(key.toLowerCase())));

        setAllocatedPanels(results);

    }

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


                </div><br /><br />

                <Row className="list-title">
                        <Col>
                            <h2 style={{ fontWeight: '700' }}>List of Allocated Panels</h2>
                        </Col>
                        <Col className='d-flex justify-content-end'>
                            <Link className='btn btn-outline-primary' to={("/admin/panelAllocation/create")} >Create New Panel</Link>
                        </Col>
                    </Row>

                <Row style={{ marginTop: '50px' }}>
                {SlicedAllocatedPanels.length > 0 ?
                    <Table responsive hover>

                        <thead>
                            <tr>
                                <th>Student Group Name</th>
                                <th>First Panel Member</th>
                                <th>Second Panel Member</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                SlicedAllocatedPanels && SlicedAllocatedPanels.map((panel) => (
                                    <tr>
                                        <td>{panel.student_group}</td>
                                        <td>{panel.panel_member1}</td>
                                        <td>{panel.panel_member2}</td>
                                        <td>  <Link to={`/admin/allocatedPanel/edit/${panel._id}`} ><FontAwesomeIcon icon={faPenToSquare} /></Link>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Link to={""} onClick={() => onDeleteAllocatedPanels(panel._id)}><FontAwesomeIcon icon={faTrashCan} /></Link>
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
                        itemsCount={AllocatedPanels.length}
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

export default ListAllocatedPanels;

