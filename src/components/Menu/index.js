import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDigging } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Menu = () => {

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
    >
      <Container>
        <Navbar.Brand href="#home">
          <FontAwesomeIcon icon={faDigging}/>
          <FontAwesomeIcon icon={faGithub} /> <span className='p-2'>GitHub Hunt</span>
        </Navbar.Brand>
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/hunt">
            <Nav.Link>Hunt</Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  )

}

export default Menu