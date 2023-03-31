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
  const [membersToRemove, setMembersToRemove] = useState([]);
  const [filteredProjectMembers, setFilteredProjectMembers] = useState(project.projectMembers);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formState, setFormState] = useState({
    projectName: project.projectName,
    projectLength: project.projectLength,
  });

  function UpdateModal() {
    this.forceUpdate()
  }

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

  return (
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
            <Modal.Title className='ms-3'> Edit {project.projectName}'s settings</Modal.Title>

            <Form onSubmit={handleSubmit} className="p-3">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Project Name</Form.Label>
                <Form.Control type="text" placeholder="Project name" name="projectName" value={formState.projectName} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Project length in hours</Form.Label>
                <Form.Control type="number" placeholder="0" name="projectLength" value={formState.projectLength} onChange={handleInputChange} />
              </Form.Group>

              <Button variant="primary" onClick={() => {
                const requestBody = {
                  projectId: project.projectId,
                  projectName: formState.projectName,
                  projectLength: formState.projectLength,
                  userSecretKey: sessionStorage.getItem('UserSecretKey')
                };

                fetch(ApiUrl + 'User/EditProject', {
                  method: 'POST',
                  headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(requestBody)
                })
                  .then(response => {
                    window.location.reload();
                  })
                  .catch(error => {
                    // Handle errors here
                  });
              }}>
                Save Changes
              </Button>
            </Form>
          </Tab>

          <Tab eventKey="addMembers" title="Members">
          <Modal.Title className='ms-3'> Edit {project.projectName}'s members</Modal.Title>
            <div className="p-3">
            <div class="d-flex">
                <DropdownButton id="dropdown-basic-button" title="+Add member" className='m-2 ms-0' variant="success">
                  {appUsers.map(user => <DropdownItem onClick={() => {
                    setMembersToAdd([...membersToAdd, user]);
                    setAppUsers(appUsers.filter(appUser => appUser !== user));
                  }}>
                    {user.fName} {user.lName}
                  </DropdownItem>)}
                </DropdownButton>
                <DropdownButton id="dropdown-basic-button" title="-Remove Member" variant="danger" className='m-2'>
                  {filteredProjectMembers.map(user => <DropdownItem onClick={() => {
                    setMembersToRemove([...membersToRemove, user]);
                    setFilteredProjectMembers(filteredProjectMembers.filter(pm => pm !== user));
                  }}>
                    {user.fName} {user.lName}
                  </DropdownItem>)}
                </DropdownButton>
              </div>

              <ListGroup className='mb-3'>
                <ListGroup.Item><b>Members</b></ListGroup.Item>

                {filteredProjectMembers.map(pm => <ListGroup.Item>{pm.fName} {pm.lName}</ListGroup.Item>)}
                {membersToAdd.map(user => <ListGroup.Item>{user.fName} {user.lName}</ListGroup.Item>)}

              </ListGroup>

              <Button variant="primary" onClick={() => {
                const sKey = sessionStorage.getItem('UserSecretKey')

                const userAddList = [];
                membersToAdd.map(user => userAddList.push({ userId: user.id, projectId: project.projectId }));

                fetch(ApiUrl + 'User/AddUsersToProject', {
                  method: 'POST',
                  headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    userSecretKey: sKey,
                    userList: userAddList
                  })
                })
                  .then(response => response.text())
                  .then(data => { window.location.reload(); })
                  .catch(error => console.error(error));

                const userRemoveList = [];
                membersToRemove.map(user => userRemoveList.push({ userId: user.id, projectId: project.projectId }));

                fetch(ApiUrl + 'User/RemoveUsersToProject', {
                  method: 'POST',
                  headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    userSecretKey: sKey,
                    userList: userRemoveList
                  })
                })
                  .then(response => response.text())
                  .then(data => { window.location.reload(); })
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


