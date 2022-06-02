import React, { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";


const PopupWindow = ({ data }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}>
                More Details
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Topic: {data.topic}</Modal.Title>

                </Modal.Header>
                <Modal.Header >
                    <Modal.Title>Group Name: {data.s_group.group_name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <h5>Topic Details</h5>

                    <h6>{data.topic_details}</h6>


                    <br />

                    <h5>Group Members</h5>
                    <h6>{data.s_group.leader}</h6>
                    <h6>{data.s_group.member1}</h6>
                    <h6>{data.s_group.member2}</h6>
                    <h6>{data.s_group.member3}</h6>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Continue
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );


}
export default PopupWindow