import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ThemeProvider, Container, Table, Row, Col, Button } from "react-bootstrap";
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./admin.css";
import Pagination from './Pagination';

const ListPanelMembers = () => {

    const [PanelMember, setPanelMember] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [indexOfFirstItem, setindexOfFirstItem] = useState(0);
    const [indexOfLastItem, setindexOfLastItem] = useState(3);
    const [recordsPerPage] = useState(3);
    const [retrievedData, setretrievedData] = useState([])
    
    //fetch panel members data
    const fetchData = useCallback(async () => {
        try {
            const PanelMemberData = await axios({
                method: 'GET',
                url: `https://p9b173fk99.execute-api.us-east-1.amazonaws.com/dev/api/v1/admin/panelMembers/all`
            })
            setPanelMember(PanelMemberData.data)
            setretrievedData(PanelMemberData.data)
        } catch (error) {
            alert(error);
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    //slice retrieved data for the pagination
    const SlicedPanelMember = PanelMember.slice(indexOfFirstItem, indexOfLastItem);


    const onDeletePanelMember = async (id) => {
        if (window.confirm('Are you sure, you want to remove the selected Panel Member?')) {
            try {
                await axios({
                    method: 'DELETE',
                    url: `http://localhost:8090/api/v1/admin/panelMembers/${id}`
                })
                alert("Selected Panel Member is removed from the system!!")
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

        setPanelMember(results);

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
                        <h2 style={{ fontWeight: '700' }}>List of Panel Members</h2>
                    </Col>
                </Row>

                <Row style={{ marginTop: '50px' }} className='body-content'>
                    {SlicedPanelMember.length > 0 ?
                        <Table responsive hover>

                            <thead>
                                <tr>
                                    <th>PanelMember User Name</th>
                                    <th>PanelMember Name</th>
                                    <th>PanelMember Contact Number</th>
                                    <th>PanelMember E-mail</th>
                                    <th>PanelMember research Field</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    SlicedPanelMember && SlicedPanelMember.map((panelMem) => (
                                        <tr>
                                            <td>{panelMem.username}</td>
                                            <td>{panelMem.name}</td>
                                            <td>{panelMem.phone}</td>
                                            <td>{panelMem.email}</td>
                                            <td>{panelMem.research}</td>
                                            <td>  <Link to={`/admin/panelMembers/edit/${panelMem._id}`} ><FontAwesomeIcon icon={faPenToSquare} /></Link>&nbsp;&nbsp;&nbsp;&nbsp;
                                                <Link to={""} onClick={() => onDeletePanelMember(panelMem._id)}><FontAwesomeIcon icon={faTrashCan} /></Link>
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
                        itemsCount={PanelMember.length}
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

export default ListPanelMembers;
