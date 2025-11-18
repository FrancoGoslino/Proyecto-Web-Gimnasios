import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import '../styles/navbar.css';

export default function Menu() {
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar expand="lg" className="navbar-floating transparent-navbar" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/inicio" className="brand-logo">
          P.GYM
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler-custom" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-lg-2">
            <Nav.Link as={Link} to="/inicio"
              className={`nav-link-custom ${isActive('/inicio') ? 'active' : ''}`}
            >
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/clases"
              className={`nav-link-custom ${isActive('/clases') ? 'active' : ''}`}
            >
              Clases
            </Nav.Link>
            <Nav.Link as={Link} to="/planes"
              className={`nav-link-custom ${isActive('/planes') ? 'active' : ''}`}
            >
              Planes
            </Nav.Link>
            <Nav.Link as={Link} to="/maquinas"
              className={`nav-link-custom ${isActive('/maquinas') ? 'active' : ''}`}
            >
              Máquinas
            </Nav.Link>
            {isLoggedIn && (
              <Nav.Link as={Link} to="/MisInscripciones"
                className={`nav-link-custom ${isActive('/MisInscripciones') ? 'active' : ''}`}
              >
                Mis Inscripciones
              </Nav.Link>
            )}
            {isLoggedIn ? (
              <Button onClick={logout}
                variant="outline-light"
                className={`btn-nav-login ${isActive('/login') ? 'active' : ''}`}
              >
                Logout
              </Button>
            ) : (
              <Button as={Link} to="/login"
                variant="primary"
                className={`btn-nav-login-1 ${isActive('/login') ? 'active' : ''}`}
              >
                Login
              </Button>
            )}
            {isLoggedIn && (
              <Nav.Link as={Link} to="/perfil"
                className="nav-link-custom"
              >
                <div className={`profile-avatar ${isActive('/perfil') ? 'active' : ''}`}>
                  👤
                </div>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}