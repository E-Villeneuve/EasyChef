import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import './navbar.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ProfileDropItem from './ProfileDropItem'

import { test_profile } from './data';

// Framework from https://react-bootstrap.github.io/components/navbar/
function NavBar() {
  return (
    <Navbar bg='dark' variant='dark' expand="lg" id='globalnavbar'>
      <Container fluid>
        <Navbar.Brand href="#home" className='nav-link'>easy chef<span id="slogan">cooking has never been easier</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Create Recipes</Nav.Link>
                <NavDropdown title="My Profile">
                    <NavDropdown.Item href="viewprofile.html" id='fstprofileitem'>{ProfileDropItem(test_profile[0])}</NavDropdown.Item>
                    <NavDropdown.Item href="editprofile.html">Edit Profile</NavDropdown.Item>
                    <NavDropdown.Item href="myrecipes.html">My Recipes</NavDropdown.Item>
                    <NavDropdown.Item href="myshoppinglist.html">My Shopping List</NavDropdown.Item>
                    <NavDropdown.Item href="logout.html" id='lastprofileitem'>Logout</NavDropdown.Item>
                </NavDropdown>
          </Nav>
          <Form className="d-flex" id='globnavsearch'>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;