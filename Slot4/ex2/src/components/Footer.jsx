import { Link } from "react-router-dom";

function Footer({ avatar, name, email }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="custom-footer mt-auto w-100">
      <div className="footer-content">
        <div className="container">
          <div className="row g-4">
            {/* Author Section */}
            <div className="col-lg-4 col-md-6 text-center text-md-start">
              <div className="footer-section">
                <div className="author-info">
                  <div className="avatar-wrapper">
                    <img
                      src={avatar}
                      alt="Author avatar"
                      className="footer-avatar"
                    />
                    <div className="avatar-ring"></div>
                  </div>
                  <h5 className="author-name">© {name}</h5>
                  <p className="author-role">Frontend Developer</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6 text-center text-md-start">
              <div className="footer-section">
                <h6 className="footer-title">Quick Links</h6>
                <ul className="footer-links">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Section */}
            <div className="col-lg-3 col-md-6 text-center text-md-start">
              <div className="footer-section">
                <h6 className="footer-title">Contact Us</h6>
                <div className="contact-info">
                  <a
                    href={`mailto:${email}`}
                    className="contact-link"
                    title={email}
                  >
                    <span className="contact-icon">✉️</span>
                    <span className="contact-text">{email}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="col-lg-3 col-md-6 text-center text-md-start">
              <div className="footer-section">
                <h6 className="footer-title">Follow Us</h6>
                <div className="social-icons">
                  <a href="#" className="social-icon facebook" aria-label="Facebook">
                    <span>📘</span>
                  </a>
                  <a href="#" className="social-icon twitter" aria-label="Twitter">
                    <span>🐦</span>
                  </a>
                  <a href="#" className="social-icon instagram" aria-label="Instagram">
                    <span>📷</span>
                  </a>
                  <a href="#" className="social-icon linkedin" aria-label="LinkedIn">
                    <span>💼</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p className="copyright-text">
                © {currentYear} {name}. All rights reserved. Made with ❤️
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
