import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";

function Header({ onSearchChange, onLogout }) {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="custom-navbar navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand brand-logo" to="/">
          <span className="brand-icon">🌺</span>
          <span className="brand-text">OrchidHub</span>
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive("/") ? "active" : ""}`} 
                to="/"
              >
                <span className="nav-icon">🏠</span>
                <span className="nav-text">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive("/about") ? "active" : ""}`} 
                to="/about"
              >
                <span className="nav-icon">ℹ️</span>
                <span className="nav-text">About</span>
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span className="nav-icon">🛍️</span>
                <span className="nav-text">Services</span>
              </a>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive("/contact") ? "active" : ""}`} 
                to="/contact"
              >
                <span className="nav-icon">📧</span>
                <span className="nav-text">Contact</span>
              </Link>
            </li>
          </ul>
          
          <div className="search-wrapper">
            <SearchBar onSearchChange={onSearchChange} />
          </div>

          <div className="logout-wrapper">
            <button 
              className="btn btn-danger btn-sm"
              onClick={onLogout}
            >
              <span className="nav-icon">🚪</span>
              <span className="nav-text">Đăng Xuất</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
