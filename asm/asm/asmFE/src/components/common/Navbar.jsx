import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, logout, isAdmin, isStaff } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const roleLabel = user.accountRole === 1 ? "Admin" : "Staff";
  const initials = (user.accountName || "U")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="nav-wrap" role="banner">
      <div className="nav-inner">
        <Link to="/" className="brand-link" aria-label="FU News Home" onClick={() => setOpen(false)}>
          <div className="brand-logo">FU</div>
          <div className="brand-name">FU News</div>
        </Link>

        <button
          className="hamburger"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Main navigation">
          <ul>
            {isAdmin() && (
              <li>
                <Link to="/accounts" className="nav-link" onClick={() => setOpen(false)}>
                  Accounts
                </Link>
              </li>
            )}

            {isStaff() && (
              <>
                <li>
                  <Link to="/news" className="nav-link" onClick={() => setOpen(false)}>
                    News Articles
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="nav-link" onClick={() => setOpen(false)}>
                    Categories
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <div className="nav-actions">
          <div className="user-block">
            <button
              className="avatar-btn"
              onClick={() => setUserMenu((s) => !s)}
              aria-haspopup="true"
              aria-expanded={userMenu}
              aria-label="User menu"
            >
              <span className="avatar">{initials}</span>
              <span className="user-name">{user.accountName}</span>
              <span className="chev" aria-hidden="true">▾</span>
            </button>

            {userMenu && (
              <div className="user-menu" role="menu" onMouseLeave={() => setUserMenu(false)}>
                <div className="user-menu-info">
                  <div className="user-menu-avatar">{initials}</div>
                  <div>
                    <div className="menu-name">{user.accountName}</div>
                    <div className="menu-role">{roleLabel}</div>
                  </div>
                </div>

                <ul className="user-menu-list">
                  <li>
                    <Link to="/profile" onClick={() => setUserMenu(false)} role="menuitem">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      className="menu-logout"
                      onClick={handleLogout}
                      role="menuitem"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
