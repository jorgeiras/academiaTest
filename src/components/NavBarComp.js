import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/objetivofuncionario.jpg'
import {Link} from 'react-router-dom'
import './NavBarComp.css'
import { useAuth } from '../context/AuthProvider';

function NavbarComp() {
  const {onLogout} = useAuth()
  return (
    <Navbar style={{ backgroundColor: '#6DAFFE' }} expand="lg" className="bg-body-tertiary shadow p-3 mb-5  rounded triangle-navbar navbar-custom-color">
      <Container >
        <img src={logo} id="logoNavbar"></img>
        
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px', marginLeft:"160px"}}
            navbarScroll
          >
            <Nav.Link href="#action1">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/perfil" >Perfil</Nav.Link>
            <NavDropdown title="Opciones" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/examen">Generar nuevo test</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4">
                Historial de test
              </NavDropdown.Item>
              
             
            </NavDropdown>
            <Nav.Link as={Link} to="/sobre_nosotros" >
              Sobre nosotros
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            
            <Button className="white-outline-button" variant="outline-success" onClick={onLogout}>Cerrar Sesión</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;