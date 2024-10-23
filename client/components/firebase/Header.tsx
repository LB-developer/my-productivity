import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../src/store/ContextProvider.tsx'
import { doSignOut } from '../../src/firebase/AuthService.ts'
import { Button, Container, Nav, Navbar } from 'react-bootstrap';


const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await doSignOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top" className="border-bottom shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Productiv
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center gap-2">
            {user ? (
              <>
                <Nav.Item className="text-muted">
                  {/* TODO: Configure adding/editing display name
                            ALSO(unsure): store the name locally so it doesn't need to be fetched?
                  */}
                  Welcome, {user.displayName || 'User'}
                </Nav.Item>
                <Button variant="outline-primary" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="text-primary">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="text-primary">
                  Register New Account
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

