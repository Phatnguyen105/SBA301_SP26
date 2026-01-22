import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import UserInfo from "./UserInfo";
import "./Header.css";

function Header({ searchText, onSearchChange }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
            {isAuthenticated ? (
              <UserInfo />
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