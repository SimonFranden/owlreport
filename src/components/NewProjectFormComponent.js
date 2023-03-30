import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {ApiUrl} from '../configParams.js';

export default function NewProjectFormComponent()
{
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formState, setFormState] = useState({
        projectName: 'test',
        projectLength: 0,       
      });

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

      const handleSubmit = (event) => {
        event.preventDefault();

        const sKey = sessionStorage.getItem('UserSecretKey')
        const body = {           
            "projectName": formState.projectName,
            "projectLength": formState.projectLength,
            "userSecretKey": sKey
        };
        
        fetch(ApiUrl + 'User/CreateProject', {
            method: 'POST',
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(response => response.text())
        .then(result => {
            console.log(result);
            alert(result);
        })
        .catch(error => {
            console.error(error);
        });
        window.location.reload();
      };

    return(
        <>
            <Button variant="primary" onClick={handleShow} className="mb-2">
            +NewProject
            </Button>
    
            <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header>
                <Modal.Title>New project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control type="text" placeholder="Project name" name="projectName" value={formState.projectName} onChange={handleInputChange}/>                       
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Project length in hours</Form.Label>
                        <Form.Control type="number" placeholder="0" name="projectLength" value={formState.projectLength} onChange={handleInputChange}/>
                    </Form.Group>
                    
                    <Button type="submit">
                    Create Project
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                
            </Modal.Footer>
            </Modal>
        </>
    )
}