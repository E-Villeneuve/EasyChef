import Container from 'react-bootstrap/Container';
import '../navbar.css';
import '../../globals.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavSearch from "../NavSearch";
import {LinkContainer} from 'react-router-bootstrap';
import { useContext } from 'react';
import { SearchContext } from '../../../App';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// Framework from https://react-bootstrap.github.io/components/navbar/
function GuestNavBar() {
    const location = useLocation();
    const { setOrdering } = useContext(SearchContext);

  return (
    <Navbar bg='dark' variant='dark' expand="lg" id='globalnavbar'>
      <Container fluid>
        <LinkContainer to='/'>
            <Nav.Link as={Link} active={location.pathname === '/'} id='nav-brand'>
                <Navbar.Brand className='nav-link'>
                    easy chef<span id="slogan">cooking has never been easier</span>
                </Navbar.Brand>
            </Nav.Link>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to='/'>
                <Nav.Link as={Link} active={location.pathname === '/'}>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/createrecipe'>
                <Nav.Link as={Link} active={location.pathname === '/createrecipe'}>Create Recipes</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/signup' active={location.pathname === '/signup'}>
                <Nav.Link as={Link}>Sign Up</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/login' active={location.pathname === '/login'}>
                <Nav.Link as={Link}>Log in</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/search' active={location.pathname === '/search'}>
                <Nav.Link as={Link}>Advanced Search</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/search'>
                <Nav.Link id='popular'
                          onClick={() => {
                            setOrdering(['-favourited', '-star_rating'])
                          }}>Popular Recipes</Nav.Link>
            </LinkContainer>
          </Nav>
          <NavSearch />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default GuestNavBar;