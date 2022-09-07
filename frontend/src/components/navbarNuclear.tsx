import 'bootstrap/dist/css/bootstrap.min.css'
import '../stylesheets/navbar.css'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Routes,
  Link,
  Route,
  Navigate,
} from 'react-router-dom'
import { LoginPage } from '../sites/loginPage'
import { RegisterPage } from '../sites/registerPage'
import { SatellitesListPage } from '../sites/satellitesController/satellitesList'
import { useCookies } from 'react-cookie'
import jwt_decode from 'jwt-decode'
import { SatelliteCreateOrEditPage } from '../sites/satellitesController/satelliteCreateOrEditPage'
import { useNavigate } from 'react-router-dom'
function NavbarNuclear() {
  //Get token from cookies
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  let token = cookies.token
  const nav = useNavigate()
  //Logout
  function Logout() {
    removeCookie('token', { path: '/' })
    nav('/')
  }

  if (token != null) {
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
                  <Nav.Link as={Link} to={'/satellites/add'}>
                    Add Satellite
                  </Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link as={Link} onClick={Logout} to={'/'}>
                    Logout
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <Routes>
          <Route path="/" element={<SatellitesListPage />} />
          <Route path="/satellites" element={<SatellitesListPage />} />
          <Route
            path="/satellites/add"
            element={<SatelliteCreateOrEditPage />}
          />
          <Route
            path="/satellites/edit/:id"
            element={<SatelliteCreateOrEditPage />}
          />
        </Routes>
      </Router>
    )
  } else
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
                <Nav className="me-auto"></Nav>
                <Nav>
                  <Nav.Link as={Link} to={'/login'}>
                    Login
                  </Nav.Link>
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
