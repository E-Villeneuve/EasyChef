import Container from 'react-bootstrap/Container';
import '../navbar.css';
import '../../globals.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Search from "../Search";
import {LinkContainer} from 'react-router-bootstrap';

// Framework from https://react-bootstrap.github.io/components/navbar/
function GuestNavBar() {
  return (
    <Navbar bg='dark' variant='dark' expand="lg" id='globalnavbar' useTransparent>
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
            <LinkContainer to='/signup'>
                <Nav.Link>Sign Up</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/login'>
                <Nav.Link>Log in</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/search'>
                <Nav.Link>Advanced Search</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/search'>
                <Nav.Link id='popular'>Popular Recipes</Nav.Link>
            </LinkContainer>
          </Nav>
          <Search />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default GuestNavBar;