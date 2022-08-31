import React from 'react'
import { Navbar, Container, NavbarBrand, NavItem, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export const SatellitesHeaderComponent = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavbarBrand href="/">Satellites</NavbarBrand>
        <Nav>
          <NavItem>
            <Link className="btn btn-primary" to="../satellites/add">
              New Satellite
            </Link>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  )
}
