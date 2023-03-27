import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

// Framework from https://react-bootstrap.github.io/components/navbar/
function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">easy chef<span id="slogan">cooking has never been easier</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Create Recipes</Nav.Link>
            <NavDropdown title="My Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile pic here</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Edit Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">My Recipes</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">My Shopping List</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.5">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
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