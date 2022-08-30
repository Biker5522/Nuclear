import 'bootstrap/dist/css/bootstrap.min.css'
import '../stylesheets/navbar.css'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom'
import { LoginPage } from '../sites/loginPage'
import { RegisterPage } from '../sites/registerPage'

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
                <Nav.Link as={Link} to={'/register'}>
                  Register
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}

export default NavbarNuclear
