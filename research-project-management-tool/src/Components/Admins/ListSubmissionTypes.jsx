import React, { useCallback, useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ThemeProvider, Container, Table, Row, Col, Button } from "react-bootstrap";
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./admin.css";
import Pagination from './Pagination';
import moment from 'moment'

const ListSubmissionTypes = () => {

    const [SubmissionTypes, setSubmissionTypes] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [indexOfFirstItem, setindexOfFirstItem] = useState(0);
    const [indexOfLastItem, setindexOfLastItem] = useState(3);
    const [recordsPerPage] = useState(3);
    const [retrievedData, setretrievedData] = useState([])

    //fetch and set retrived data 
    const fetchData = useCallback(async () => {
        try {
            const SubmissionTypesData = await axios({
                method: 'GET',
                url: `https://p9b173fk99.execute-api.us-east-1.amazonaws.com/dev/api/v1/admin/submissionTypes/all`
            })
            setSubmissionTypes(SubmissionTypesData.data)
            setretrievedData(SubmissionTypesData.data)
        } catch (error) {
            alert(error);
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    //slice retrieved data for the pagination
    const SlicedSubmissionTypes = SubmissionTypes.slice(indexOfFirstItem, indexOfLastItem);

    //delete submission type
    const onDeleteSubmissionTypes = async (id) => {
        if (window.confirm('Are you sure, you want to remove the selected Submission Type?')) {
            try {
                await axios({
                    method: 'DELETE',
                    url: `https://p9b173fk99.execute-api.us-east-1.amazonaws.com/dev/api/v1/admin/submissionTypes/${id}`
                })
                alert("Selected Submission Type is removed from the system!!")
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

        setSubmissionTypes(results);

    }

    //search function
    const handleSearch = (e) => {

        const k = e.target.value.toLowerCase()

        filterData(retrievedData, k);


    }

    //data conversion
    function convertDates(date) {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a');
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

                <Row className="list-title">
                    <Col>
                        <h2 style={{ fontWeight: '700' }}>List of Submission Types</h2>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <Link className='btn btn-outline-primary' to={("/admin/create/submissionTypes")} >Create New Submssion Type</Link>
                    </Col>
                </Row>

                <Row style={{ marginTop: '50px' }} className='body-content'>
                    {SlicedSubmissionTypes.length > 0 ?
                        <Table responsive hover>

                            <thead>
                                <tr>
                                    <th>Submission Type </th>
                                    <th>Submission Types Description</th>
                                    <th>Submission Type Deadline </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    SlicedSubmissionTypes && SlicedSubmissionTypes.map((submission) => (
                                        <tr>
                                            <td>{submission.submission_type}</td>
                                            <td>{submission.submission_description}</td>
                                            <td>{convertDates(submission.submission_deadline)}</td>
                                            <td>  <Link to={`/admin/submissionTypes/edit/${submission._id}`} ><FontAwesomeIcon icon={faPenToSquare} /></Link>&nbsp;&nbsp;&nbsp;&nbsp;
                                                <Link to={""} onClick={() => onDeleteSubmissionTypes(submission._id)}><FontAwesomeIcon icon={faTrashCan} /></Link>
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
                        itemsCount={SubmissionTypes.length}
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

export default ListSubmissionTypes;
