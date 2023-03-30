import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/esm/DropdownItem.js';
import { ApiUrl } from '../configParams.js';

export default function EditProjectModal({ project }) {
  const [show, setShow] = useState(false);
  const [appUsers, setAppUsers] = useState([]);
  const [membersToAdd, setMembersToAdd] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formState, setFormState] = useState({
    projectName: project.projectName,
    projectLength: project.projectLength,
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
    window.location.reload();
  };

  useEffect(() => {
    fetch(ApiUrl + 'User', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredUserList = data.filter(
          (item) =>
            !project.projectMembers.some((elem) => elem.id === item.id)
        );
        setAppUsers(filteredUserList);
      })
      .catch((error) => console.error(error));
  }, []);

    return(
        <>
        <Button variant='warning' onClick={handleShow} className='ms-2 border-0 d-inline'>Edit</Button>
  
        <Modal show={show} onHide={handleClose} animation={false} className="">
            
        
            <Tabs
                defaultActiveKey="settings"
                id="justify-tab-example"
                className="mb-3"
                justify
                >
                <Tab eventKey="settings" title="Settings">
                    <Modal.Title className='ms-3'> Edit {project.projectName}</Modal.Title>

                    <Form onSubmit={handleSubmit} className="p-3">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control type="text" placeholder="Project name" name="projectName" value={formState.projectName} onChange={handleInputChange}/>                       
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Project length in hours</Form.Label>
                            <Form.Control type="number" placeholder="0" name="projectLength" value={formState.projectLength} onChange={handleInputChange}/>
                        </Form.Group>
                        
                        <Button variant="primary" onClick={handleClose}>
                        Save Changes
                        </Button>
                    </Form>
                </Tab>
                <Tab eventKey="addMembers" title="Members">
                    <div className="p-3">
                        <DropdownButton id="dropdown-basic-button" title="+Add member">
                           {appUsers.map(user => <DropdownItem onClick={() => {
                            setMembersToAdd([...membersToAdd, user]);
                            setAppUsers(appUsers.filter(appUser => appUser !== user ));
                            
                            }}>

                            {user.fName} {user.lName}
                        </DropdownItem>)}
                            
                        </DropdownButton>

                        <ListGroup className='mb-3'>
                        <ListGroup.Item><b>Members</b></ListGroup.Item>
                        {project.projectMembers.map(pm => <ListGroup.Item>{pm.fName} {pm.lName}</ListGroup.Item>)}
                        {membersToAdd.map(user => <ListGroup.Item>{user.fName} {user.lName}</ListGroup.Item>)} 
                        
                        </ListGroup>                       
                        <Button variant="primary" onClick={() => {
                            const sKey = sessionStorage.getItem('UserSecretKey')
                            const userList1 = [{userId: 4, projectId: 1}];
                            const userList = [];
                            membersToAdd.map(user => userList.push({userId: user.id, projectId: project.projectId}));

                            fetch('https://localhost:7063/api/User/AddUsersToProject', {
                                method: 'POST',
                                headers: {
                                  'Accept': 'text/plain',
                                  'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                  userSecretKey: sKey,
                                  userList: userList                                  
                                })
                              })
                                .then(response => response.text())
                                .then(data => {alert(data); window.location.reload();})
                                .catch(error => console.error(error));
                                
                            }}>
                        Save Changes
                        </Button>
                    </div>
                </Tab>

            </Tabs>
                             
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>
      </>
    );
}
        

