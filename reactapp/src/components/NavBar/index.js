import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import './navbar.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ProfileDropItem from './ProfileDropItem';

import { test_profile } from './data';
import {LinkContainer} from 'react-router-bootstrap'

// Framework from https://react-bootstrap.github.io/components/navbar/
function NavBar() {
  return (
    <Navbar bg='dark' variant='dark' expand="lg" id='globalnavbar'>
      <Container fluid>
        <LinkContainer to='/'>
            <Nav.Link id='nav-brand'>
                <Navbar.Brand href="#home" className='nav-link'>
                    easy chef<span id="slogan">cooking has never been easier</span>
                </Navbar.Brand>
            </Nav.Link>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to='/'>
                <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/createrecipe'>
                <Nav.Link>Create Recipes</Nav.Link>
            </LinkContainer>
                <NavDropdown title="My Profile" id='navbar_profile_dropdown'>
                    <NavDropdown.Item id='fstprofileitem' className='navbar_drop_item'>
                        <LinkContainer to='/profile'>
                            <Nav.Link>
                                {ProfileDropItem(test_profile[0])}
                            </Nav.Link>
                        </LinkContainer>
                    </NavDropdown.Item>
                    <NavDropdown.Item className='navbar_drop_item'>
                        <LinkContainer to='/editprofile'>
                            <Nav.Link>
                                Edit Profile
                            </Nav.Link>
                        </LinkContainer>
                    </NavDropdown.Item>
                    <NavDropdown.Item className='navbar_drop_item'>
                        <LinkContainer to='/myrecipes'>
                            <Nav.Link>
                                My Recipes
                            </Nav.Link>
                        </LinkContainer>
                    </NavDropdown.Item>
                    <NavDropdown.Item className='navbar_drop_item'>
                        <LinkContainer to='/myshoppinglist'>
                            <Nav.Link>
                            My Shopping List
                            </Nav.Link>
                        </LinkContainer>
                    </NavDropdown.Item>
                    <NavDropdown.Item id='lastprofileitem' className='navbar_drop_item'>
                        <LinkContainer to='/logout'>
                            <Nav.Link>
                            Logout
                            </Nav.Link>
                        </LinkContainer>
                    </NavDropdown.Item>
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