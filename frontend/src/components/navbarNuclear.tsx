import 'bootstrap/dist/css/bootstrap.min.css'
import '../stylesheets/navbar.css'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom'

function NavbarNuclear() {
  return (
    <Router>
      <div className="Navbar">
        <Navbar variant="light" expand="lg">
          <Container>
            <Navbar.Brand
              style={{ fontSize: '1.6rem', fontWeight: 'bold' }}
              href="#home"
            >
              Nuclear
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to={'/'}>
                  Satellites
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link as={Link} to={'/'}>
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <Routes>
        <Route path="/" />
        <Route path="/login" />
        <Route path="/register" />
      </Routes>
    </Router>
  )
}

export default NavbarNuclear
