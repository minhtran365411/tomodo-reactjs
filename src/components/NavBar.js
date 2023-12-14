import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import '../App.css';


function NavBar() {
  return (
    <>
      <Navbar className='navbar' data-bs-theme="dark">
        <Container>
        <Navbar.Brand href="#home">
            <img
              alt=""
              src={require("../assets/imgs/Tomodo-Logo.png")}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            TOMODO
          </Navbar.Brand>
          
          <Nav className="me-auto">
            <Nav.Link className="navlink" href="/">Home</Nav.Link>
            <Nav.Link className="navlink" href="/inprogress-tasks">In-progress Tasks</Nav.Link>
            <Nav.Link className="navlink" href="/completed-tasks">Completed Tasks</Nav.Link>
            <Nav.Link className="navlink" href="/paramodo">Paramodo</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;