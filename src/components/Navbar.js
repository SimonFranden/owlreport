import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";


export const NavbarComponent = (props) => {
  const handleLogout = props.handleLogout;

  return (
    <Navbar display="flex" bg="dark" variant="dark" expand="sm" className="pb-3">
      <Container>
        <Navbar.Brand>Time Report APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
            <Nav.Link as={NavLink} to="/timesheet">Time Sheet</Nav.Link>
            <Nav.Link as={NavLink} to="/projects">Projects</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}