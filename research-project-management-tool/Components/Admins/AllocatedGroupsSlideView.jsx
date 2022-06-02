import React from 'react';
import { Offcanvas } from "react-bootstrap";

const AllocatedGroups = ({show, handleClose, placement, title, body}) => {

    return (
        <>
            <Offcanvas style={{width: `38%`}}  show={show} placement={placement} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{title}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <hr/>
                    {body}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default AllocatedGroups;