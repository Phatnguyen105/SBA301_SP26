"use client"

import { NavLink } from "react-router-dom"
import { useState, useEffect } from "react"

function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`navbar navbar-expand-lg sticky-top transition-all ${
        scrolled ? "shadow-lg py-2" : "py-3"
      }`}
      style={{
        backdropFilter: "blur(14px)",
        background:
          scrolled
            ? "linear-gradient(120deg, rgba(255,255,255,0.94), rgba(236,245,255,0.94))"
            : "linear-gradient(120deg, rgba(255,255,255,0.9), rgba(236,245,255,0.85))",
        borderBottom: "1px solid rgba(0,0,0,0.04)",
      }}
    >
      <div className="container">
        {/* Brand */}
        <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle brand-circle"
            aria-hidden="true"
          >
            <span className="fw-bold fs-5 text-white">P</span>
          </div>
          <span className="fw-bold fs-4 text-dark">
            Phat<span className="text-accent">Nguyen</span>
          </span>
        </NavLink>

        {/* Toggler */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <li className="nav-item" key={item.to}>
                <NavLink
                  className={({ isActive }) =>
                    `nav-link px-4 py-2 rounded-pill transition-all ${
                      isActive ? "active-pill" : "muted-pill"
                    }`
                  }
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="nav-item ms-lg-2">
              <a
                href="#get-started"
                className="btn btn-accent btn-sm px-4 py-2 rounded-pill fw-semibold shadow-sm transition-all"
              >
                Get Started
              </a>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .transition-all {
          transition: all 0.28s ease;
        }

        .brand-circle {
          width: 42px;
          height: 42px;
          background: linear-gradient(135deg, #16a0ff, #5ee0c7);
          box-shadow: 0 8px 24px rgba(22, 160, 255, 0.28);
        }

        .text-accent {
          color: #16a0ff;
        }

        .nav-link {
          position: relative;
          font-weight: 600;
          letter-spacing: 0.01em;
        }

        .muted-pill {
          color: #4a5568 !important;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(0, 0, 0, 0.04);
        }

        .muted-pill:hover {
          color: #111827 !important;
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
        }

        .active-pill {
          color: #0b172a !important;
          background: linear-gradient(135deg, #16a0ff, #5ee0c7);
          box-shadow: 0 10px 28px rgba(22, 160, 255, 0.28);
        }

        .btn-accent {
          background: linear-gradient(135deg, #16a0ff, #5ee0c7);
          border: none;
          color: #0b172a;
        }

        .btn-accent:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 28px rgba(22, 160, 255, 0.32);
        }

        .navbar-brand {
          color: #0b172a;
        }

        .navbar-brand:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
      `}</style>
    </nav>
  )
}

export default Header