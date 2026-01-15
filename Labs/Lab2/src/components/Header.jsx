import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Header.css";

function Header({ searchText, onSearchChange }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('lab2_isLoggedIn');
    const user = localStorage.getItem('lab2_username');
    if (loggedIn && user) {
      setIsLoggedIn(true);
      setUsername(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('lab2_isLoggedIn');
    localStorage.removeItem('lab2_username');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
    window.location.reload();
  };

  return (
    <Navbar bg="white" expand="lg" className="header-navbar sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="header-brand">
          🌸 Orchid Store
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link-custom">About</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link-custom">Contact</Nav.Link>
          </Nav>

          <Form className="search-form">
            <Form.Control
              type="search"
              placeholder="Search orchids..."
              value={searchText}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
          </Form>

          <Nav className="ms-3">
            {isLoggedIn ? (
              <>
                <Nav.Link className="user-info">👤 {username}</Nav.Link>
                <Nav.Link onClick={handleLogout} className="logout-btn">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className="login-btn">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;